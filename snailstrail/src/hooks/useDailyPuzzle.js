import { useCallback } from 'react';
import vitalArticles from '../data/vital-articles.json';
import vitalCategories from '../data/vital-categories.json';
import reachability from '../data/reachability.json';
import { getDailySeed, mulberry32, getGameDateStr } from '../utils/seed.js';
import { SIM_RANGES } from '../utils/scoring.js';
import { categoryJaccard } from '../utils/categories.js';

const MAX_PAIR_ATTEMPTS = 20;

/**
 * Hook for generating daily puzzle pairs using composite similarity-based difficulty.
 *
 * Requires the embedder (getCompositeSimilarity) and wikipedia (validatePair) hooks
 * to be passed in as dependencies.
 */
export function useDailyPuzzle({ getCompositeSimilarity, resolveCanonicalTitle }) {
  /**
   * Generate a pair of articles for the given difficulty.
   * Samples random pairs from vital-articles.json, checks composite similarity
   * against the difficulty range, and validates both articles have enough links.
   */
  const generatePairByDifficulty = useCallback(
    async (difficulty) => {
      const seed = getDailySeed(difficulty);
      const rng = mulberry32(seed);
      const [minSim, maxSim] = SIM_RANGES[difficulty] || SIM_RANGES.easy;

      for (let attempt = 0; attempt < MAX_PAIR_ATTEMPTS; attempt++) {
        const idxA = Math.floor(rng() * vitalArticles.length);
        let idxB = Math.floor(rng() * vitalArticles.length);
        if (idxB === idxA) {
          idxB = (idxA + 1) % vitalArticles.length;
        }

        const start = vitalArticles[idxA];
        const target = vitalArticles[idxB];

        // Look up precomputed categories for vital articles
        const catsA = vitalCategories[start] || [];
        const catsB = vitalCategories[target] || [];

        let result;
        try {
          result = await getCompositeSimilarity(start, target, catsA, catsB);
        } catch {
          continue;
        }

        const similarity = result.compositeSim;

        if (similarity < minSim || similarity > maxSim) {
          continue;
        }

        // Check reachability — skip pairs with no known path
        const diffReach = reachability[difficulty];
        if (diffReach && Object.keys(diffReach).length > 0) {
          if (!diffReach[start]?.[target]) {
            continue;
          }
        }

        // Check category diversity against other difficulties' cached puzzles
        const dateKey = getGameDateStr();
        let categoryConflict = false;
        for (const otherDiff of ['easy', 'medium', 'hard']) {
          if (otherDiff === difficulty) continue;
          try {
            const otherCache = localStorage.getItem(`snailstrail_puzzle_${dateKey}_${otherDiff}`);
            if (otherCache) {
              const otherPuzzle = JSON.parse(otherCache);
              const otherTargetCats = vitalCategories[otherPuzzle.target] || [];
              const thisCats = catsB; // already computed above in the loop
              if (otherTargetCats.length > 0 && thisCats.length > 0 && categoryJaccard(otherTargetCats, thisCats) > 0.5) {
                categoryConflict = true;
                break;
              }
            }
          } catch {
            // Ignore localStorage errors
          }
        }
        if (categoryConflict) continue;

        const [canonicalStart, canonicalTarget] = await Promise.all([
          resolveCanonicalTitle(start),
          resolveCanonicalTitle(target),
        ]);
        return { start: canonicalStart, target: canonicalTarget, similarity };
      }

      // Fallback: find a reachable pair
      const fallbackRng = mulberry32(seed + 9999);
      const diffReach = reachability[difficulty];
      const hasReachData = diffReach && Object.keys(diffReach).length > 0;

      for (let fallbackAttempt = 0; fallbackAttempt < 100; fallbackAttempt++) {
        const idxA = Math.floor(fallbackRng() * vitalArticles.length);
        let idxB = Math.floor(fallbackRng() * vitalArticles.length);
        if (idxB === idxA) idxB = (idxA + 1) % vitalArticles.length;

        const start = vitalArticles[idxA];
        const target = vitalArticles[idxB];

        if (hasReachData && !diffReach[start]?.[target]) {
          continue;
        }

        const [canonicalStart, canonicalTarget] = await Promise.all([
          resolveCanonicalTitle(start),
          resolveCanonicalTitle(target),
        ]);
        return { start: canonicalStart, target: canonicalTarget, similarity: null };
      }

      // Ultimate fallback if no reachable pair found (shouldn't happen with good data)
      const [canonicalStart, canonicalTarget] = await Promise.all([
        resolveCanonicalTitle(vitalArticles[0]),
        resolveCanonicalTitle(vitalArticles[1]),
      ]);
      return {
        start: canonicalStart,
        target: canonicalTarget,
        similarity: null,
      };
    },
    [getCompositeSimilarity, resolveCanonicalTitle]
  );

  const getDailyPuzzle = useCallback(
    async (difficulty) => {
      const dateKey = getGameDateStr();
      const cacheKey = `snailstrail_puzzle_${dateKey}_${difficulty}`;

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch {
        // Ignore localStorage errors
      }

      const pair = await generatePairByDifficulty(difficulty);

      try {
        localStorage.setItem(cacheKey, JSON.stringify(pair));
      } catch {
        // Ignore localStorage errors
      }

      return pair;
    },
    [generatePairByDifficulty]
  );

  return { getDailyPuzzle, generatePairByDifficulty };
}
