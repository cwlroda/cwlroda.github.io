/**
 * Daily seed generation and seeded PRNG.
 */

/**
 * djb2 hash function for strings.
 */
function djb2(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

/**
 * Returns the current game date, adjusted for 4am SGT daily reset.
 * Before 4:00 SGT (20:00 UTC), the game day is still "yesterday" in SGT.
 */
export function getGameDate() {
  const now = new Date();
  // Shift to SGT (UTC+8)
  const sgt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  // Before 4am SGT counts as previous day
  if (sgt.getUTCHours() < 4) {
    sgt.setUTCDate(sgt.getUTCDate() - 1);
  }
  return sgt;
}

/**
 * Returns the game date as a "YYYY-MM-DD" string (in SGT, 4am reset).
 */
export function getGameDateStr() {
  const d = getGameDate();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

/**
 * Returns a deterministic seed for today's puzzle at the given difficulty.
 * Same date + difficulty always produces the same seed.
 */
export function getDailySeed(difficulty) {
  const dateStr = getGameDateStr();
  return djb2(`snailstrail:${dateStr}:${difficulty}`);
}

/**
 * Mulberry32 — a fast, seedable 32-bit PRNG.
 * Returns a function that produces numbers in [0, 1) on each call.
 */
export function mulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
