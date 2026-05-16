import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook that manages the Transformers.js web worker for semantic embedding.
 * Creates the worker on mount, sends LOAD, and exposes async helpers.
 *
 * Supports both raw embedding similarity and composite similarity
 * (embedding + category Jaccard).
 */
export function useEmbedder() {
  const workerRef = useRef(null);
  const pendingRef = useRef(new Map()); // id → { resolve, reject, ... }
  const idCounter = useRef(0);
  const [modelReady, setModelReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(null);

  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/embedder.worker.js', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const { type, payload } = e.data;

      switch (type) {
        case 'READY':
          setModelReady(true);
          setLoadProgress(null);
          break;
        case 'PROGRESS':
          setLoadProgress(payload);
          break;
        case 'EMBEDDING': {
          for (const [id, p] of pendingRef.current.entries()) {
            if (p.type === 'EMBED' && p.title === payload.title) {
              p.resolve(payload.embedding);
              pendingRef.current.delete(id);
            }
          }
          break;
        }
        case 'SCORE': {
          for (const [id, p] of pendingRef.current.entries()) {
            if (p.type === 'SIMILARITY' && p.a === payload.a && p.b === payload.b) {
              p.resolve(payload.similarity);
              pendingRef.current.delete(id);
            }
          }
          break;
        }
        case 'COMPOSITE_SCORE': {
          for (const [id, p] of pendingRef.current.entries()) {
            if (p.type === 'COMPOSITE_SIMILARITY' && p.a === payload.a && p.b === payload.b) {
              p.resolve(payload);
              pendingRef.current.delete(id);
            }
          }
          break;
        }
        case 'ERROR': {
          console.error('[Embedder Worker]', payload);
          const firstKey = pendingRef.current.keys().next().value;
          if (firstKey !== undefined) {
            pendingRef.current.get(firstKey).reject(new Error(payload));
            pendingRef.current.delete(firstKey);
          }
          break;
        }
      }
    };

    worker.postMessage({ type: 'LOAD' });

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const embedArticle = useCallback((title, description, firstSentence) => {
    return new Promise((resolve, reject) => {
      const id = idCounter.current++;
      pendingRef.current.set(id, { type: 'EMBED', title, resolve, reject });
      workerRef.current?.postMessage({
        type: 'EMBED',
        payload: { title, description, firstSentence },
      });
    });
  }, []);

  const getSimilarity = useCallback((a, b) => {
    return new Promise((resolve, reject) => {
      const id = idCounter.current++;
      pendingRef.current.set(id, { type: 'SIMILARITY', a, b, resolve, reject });
      workerRef.current?.postMessage({ type: 'SIMILARITY', payload: { a, b } });
    });
  }, []);

  /**
   * Compute composite similarity (0.7 * embedding + 0.3 * category Jaccard).
   * Returns { embeddingSim, categorySim, compositeSim }.
   * If categories are unavailable, pass empty arrays — the worker will
   * fall back to embedding-only (category Jaccard = 0).
   */
  const getCompositeSimilarity = useCallback((a, b, categoriesA, categoriesB) => {
    return new Promise((resolve, reject) => {
      const id = idCounter.current++;
      pendingRef.current.set(id, { type: 'COMPOSITE_SIMILARITY', a, b, resolve, reject });
      workerRef.current?.postMessage({
        type: 'COMPOSITE_SIMILARITY',
        payload: { a, b, categoriesA: categoriesA || [], categoriesB: categoriesB || [] },
      });
    });
  }, []);

  return { modelReady, loadProgress, embedArticle, getSimilarity, getCompositeSimilarity };
}
