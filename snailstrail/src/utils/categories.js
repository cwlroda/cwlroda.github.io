/**
 * Prefixes for hidden/maintenance categories to filter out.
 */
const EXCLUDED_CATEGORY_PREFIXES = [
  'Articles ',
  'All ',
  'CS1 ',
  'Webarchive ',
  'Pages ',
  'Use ',
  'Short description',
  'Wikipedia articles',
  'Commons category',
  'Articles with',
  'Accuracy disputes',
  'Cleanup tagged',
  'Wikipedia indefinitely',
  'Wikipedia neutral',
  'Good articles',
  'Featured articles',
];

/**
 * Filter out hidden/maintenance categories from a raw category list.
 * Wikipedia categories arrive as "Category:Foo" — strip the prefix and filter.
 * @param {string[]} rawCategories - e.g. ["Category:Jazz genres", "Category:Articles needing..."]
 * @returns {string[]} - e.g. ["Jazz genres"]
 */
export function filterCategories(rawCategories) {
  return rawCategories
    .map((c) => c.replace(/^Category:/, ''))
    .filter((c) => !EXCLUDED_CATEGORY_PREFIXES.some((p) => c.startsWith(p)));
}

/**
 * Jaccard similarity between two category arrays.
 * Returns 0 if either set has fewer than 2 elements (not enough signal).
 * @param {string[]} a
 * @param {string[]} b
 * @returns {number} 0–1
 */
export function categoryJaccard(a, b) {
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
