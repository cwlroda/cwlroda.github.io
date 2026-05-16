/**
 * Scrub src/data/vital-articles.json so every entry is a canonical Wikipedia
 * article title. Reads the existing list, resolves redirects via the query
 * API (redirects=1) in batches of 50, deduplicates titles that collapse onto
 * a shared canonical, sorts, and writes back.
 *
 * Why a scrub instead of a fresh fetch: Wikipedia's vital-articles category
 * layout has changed since the original list was bootstrapped, and the
 * previous category-members query now returns zero. The project snapshot in
 * vital-articles.json is the authoritative source; this script keeps it in
 * canonical form so downstream data (embeddings, categories, metadata) is
 * keyed consistently.
 *
 * Usage: node scripts/fetch-vital-articles.js
 */

const API = 'https://en.wikipedia.org/w/api.php';
const REDIRECT_BATCH_SIZE = 50; // Wikipedia query API limit for titles per request
const UA = 'SnailsTrail/1.0 (build script; https://github.com/weiloon-datature/pixelcraft)';

/**
 * Resolve redirects for a batch of up to REDIRECT_BATCH_SIZE titles.
 * Returns a Map<rawTitle, canonicalTitle>.
 *
 * Wikipedia returns:
 *   query.normalized: [{from, to}]  — case/space normalization
 *   query.redirects:  [{from, to}]  — redirect follows
 *   query.pages:      { pageid: { title } }
 *
 * Chain: raw -> (normalized or raw) -> (redirects.to or same) -> page.title.
 * The page.title is always the final canonical, so we can short-circuit by
 * matching the input titles against the chain.
 */
async function resolveBatch(titles) {
  const params = new URLSearchParams({
    action: 'query',
    titles: titles.join('|'),
    redirects: '1',
    format: 'json',
    origin: '*',
  });
  const res = await fetch(`${API}?${params}`, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const data = await res.json();

  // Build forward map: from -> to (includes both normalizations and redirects)
  const forward = new Map();
  for (const n of data.query?.normalized ?? []) forward.set(n.from, n.to);
  for (const r of data.query?.redirects ?? []) forward.set(r.from, r.to);

  // Canonical set: all page titles returned (these are final forms)
  const pageTitles = new Set(
    Object.values(data.query?.pages ?? {}).map((p) => p.title).filter(Boolean),
  );

  // For each input title, walk the forward chain until we hit a page title.
  // If the chain doesn't land on a page title (missing page, edge case),
  // fall back to the raw title.
  const out = new Map();
  for (const t of titles) {
    let cur = t;
    for (let step = 0; step < 10; step++) {
      if (pageTitles.has(cur)) break;
      const next = forward.get(cur);
      if (!next || next === cur) break;
      cur = next;
    }
    out.set(t, pageTitles.has(cur) ? cur : t);
  }
  return out;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const { readFileSync, writeFileSync } = await import('fs');
  const { resolve, dirname } = await import('path');
  const { fileURLToPath } = await import('url');

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = resolve(__dirname, '..', 'src', 'data', 'vital-articles.json');

  // --- 1. Read existing list ---
  const rawTitles = JSON.parse(readFileSync(filePath, 'utf-8'));
  if (!Array.isArray(rawTitles) || rawTitles.length === 0) {
    throw new Error(`${filePath} is empty or not an array; refusing to overwrite`);
  }
  console.log(`Loaded ${rawTitles.length} titles from ${filePath}`);

  const preDedupe = rawTitles.length;
  const uniqueRawTitles = [...new Set(rawTitles)];
  if (uniqueRawTitles.length !== preDedupe) {
    console.log(`Removed ${preDedupe - uniqueRawTitles.length} duplicate raw titles.`);
  }

  // --- 2. Resolve redirects in batches ---
  console.log(`\nResolving redirects in batches of ${REDIRECT_BATCH_SIZE}...`);
  const rawToCanonical = new Map();
  for (let i = 0; i < uniqueRawTitles.length; i += REDIRECT_BATCH_SIZE) {
    const slice = uniqueRawTitles.slice(i, i + REDIRECT_BATCH_SIZE);
    const batchNum = i / REDIRECT_BATCH_SIZE + 1;
    try {
      const resolved = await resolveBatch(slice);
      for (const [raw, canonical] of resolved) {
        rawToCanonical.set(raw, canonical);
      }
    } catch (err) {
      console.warn(`Batch ${batchNum} failed (${err.message}); keeping raw titles`);
      for (const raw of slice) rawToCanonical.set(raw, raw);
    }
    const isLastBatch = i + REDIRECT_BATCH_SIZE >= uniqueRawTitles.length;
    if (batchNum % 5 === 0 || isLastBatch) {
      console.log(`  Resolved ${Math.min(i + REDIRECT_BATCH_SIZE, uniqueRawTitles.length)}/${uniqueRawTitles.length}`);
    }
    await sleep(200);
  }

  // --- 3. Count rewrites, dedupe, sort ---
  let rewriteCount = 0;
  const canonicalSet = new Set();
  for (const raw of uniqueRawTitles) {
    const canonical = rawToCanonical.get(raw) ?? raw;
    if (canonical !== raw) rewriteCount++;
    canonicalSet.add(canonical);
  }
  const dedupeCount = uniqueRawTitles.length - canonicalSet.size;
  const titles = [...canonicalSet].sort();

  console.log(`\nRewrote ${rewriteCount} redirect titles to canonical.`);
  console.log(`Deduplicated ${dedupeCount} titles that pointed to an already-included canonical.`);
  console.log(`Final count: ${titles.length} canonical articles.`);

  // --- 4. Write output ---
  writeFileSync(filePath, JSON.stringify(titles, null, 2) + '\n');
  console.log(`\nWrote ${titles.length} articles to ${filePath}`);
}

main().catch((err) => {
  console.error('Failed to scrub vital articles:', err);
  process.exit(1);
});
