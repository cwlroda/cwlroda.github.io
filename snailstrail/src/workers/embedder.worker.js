/**
 * Web Worker for semantic embedding using Transformers.js.
 * Runs Xenova/bge-small-en-v1.5 entirely off the main thread.
 * Loads precomputed embeddings for vital articles from vital-embeddings.bin.
 *
 * Messages:
 *   LOAD                     → loads model + precomputed data, replies READY or PROGRESS
 *   EMBED {title, description, firstSentence} → embeds rich text, replies EMBEDDING
 *   SIMILARITY {a, b}        → cosine similarity of embeddings, replies SCORE
 *   COMPOSITE_SIMILARITY {a, b, categoriesA, categoriesB}
 *                            → weighted composite of embedding + category similarity, replies COMPOSITE_SCORE
 */

import { pipeline, env } from '@xenova/transformers';

// Skip the library's local-model probe. The default behavior fetches
// /models/<id>/config.json from the page origin first, and on any host
// with an SPA fallback (Vite dev server, the GH Pages 404 shim) that
// request returns the host app's index.html — which the library then
// tries to .json(), throwing "Unexpected token '<'". Models come from
// huggingface.co directly.
env.allowLocalModels = false;

let embedder = null;
const cache = new Map(); // title → Float32Array

// Precomputed vital article data
let vitalEmbeddings = null; // Float32Array (N * 384)
let vitalMeta = null;       // { titleToIndex, descriptions, firstSentences }

const EMBEDDING_DIM = 384;

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function categoryJaccard(a, b) {
  if (!a || !b || a.length < 2 || b.length < 2) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Build a rich text string for embedding from article metadata.
 * Always prepends "passage: " prefix for bge-small-en-v1.5.
 */
function buildRichText(title, description, firstSentence) {
  let text = title;
  if (description) text += ` — ${description}`;
  if (firstSentence) text += `. ${firstSentence}`;
  return `passage: ${text}`;
}

/**
 * Get or compute the embedding for a title.
 * Checks cache first, then precomputed vital data, then computes on the fly.
 */
async function getEmbedding(title, description, firstSentence) {
  if (cache.has(title)) return cache.get(title);

  // Check precomputed vital articles
  if (vitalMeta?.titleToIndex?.[title] != null) {
    const idx = vitalMeta.titleToIndex[title];
    // Copy the slice — subarray() returns a shared view; we need an independent Float32Array
    const embedding = new Float32Array(vitalEmbeddings.subarray(idx * EMBEDDING_DIM, (idx + 1) * EMBEDDING_DIM));
    cache.set(title, embedding);
    return embedding;
  }

  // Compute on the fly
  const richText = buildRichText(title, description || '', firstSentence || '');
  const output = await embedder(richText, { pooling: 'mean', normalize: true });
  const embedding = new Float32Array(output.data);
  cache.set(title, embedding);
  return embedding;
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'LOAD': {
      try {
        // Load model
        embedder = await pipeline('feature-extraction', 'Xenova/bge-small-en-v1.5', {
          progress_callback: (progress) => {
            self.postMessage({ type: 'PROGRESS', payload: progress });
          },
        });

        // Load precomputed data
        try {
          const [embResponse, metaResponse] = await Promise.all([
            fetch(new URL('../data/vital-embeddings.bin', import.meta.url)),
            fetch(new URL('../data/vital-metadata.json', import.meta.url)),
          ]);
          if (embResponse.ok && metaResponse.ok) {
            const embBuffer = await embResponse.arrayBuffer();
            vitalEmbeddings = new Float32Array(embBuffer);
            vitalMeta = await metaResponse.json();
            console.log(`[Worker] Loaded ${Object.keys(vitalMeta.titleToIndex).length} precomputed embeddings`);
          }
        } catch (preErr) {
          console.warn('[Worker] Failed to load precomputed data, will compute on the fly:', preErr.message);
        }

        self.postMessage({ type: 'READY' });
      } catch (err) {
        self.postMessage({ type: 'ERROR', payload: err.message });
      }
      break;
    }

    case 'EMBED': {
      const { title, description, firstSentence } = payload;
      try {
        const embedding = await getEmbedding(title, description, firstSentence);
        self.postMessage({
          type: 'EMBEDDING',
          payload: { title, embedding },
        });
      } catch (err) {
        self.postMessage({ type: 'ERROR', payload: `Embed failed for "${title}": ${err.message}` });
      }
      break;
    }

    case 'SIMILARITY': {
      const { a, b } = payload;
      try {
        const embA = await getEmbedding(a);
        const embB = await getEmbedding(b);
        const similarity = cosineSimilarity(embA, embB);
        self.postMessage({
          type: 'SCORE',
          payload: { a, b, similarity },
        });
      } catch (err) {
        self.postMessage({ type: 'ERROR', payload: `Similarity failed: ${err.message}` });
      }
      break;
    }

    case 'COMPOSITE_SIMILARITY': {
      const { a, b, categoriesA, categoriesB } = payload;
      try {
        const embA = await getEmbedding(a);
        const embB = await getEmbedding(b);
        const embeddingSim = cosineSimilarity(embA, embB);
        const categorySim = categoryJaccard(categoriesA, categoriesB);
        const compositeSim = 0.7 * embeddingSim + 0.3 * categorySim;
        self.postMessage({
          type: 'COMPOSITE_SCORE',
          payload: { a, b, embeddingSim, categorySim, compositeSim },
        });
      } catch (err) {
        self.postMessage({ type: 'ERROR', payload: `Composite similarity failed: ${err.message}` });
      }
      break;
    }
  }
};
