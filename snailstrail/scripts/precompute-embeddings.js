// scripts/precompute-embeddings.js
/**
 * Build-time script that precomputes:
 * 1. Rich text embeddings for all vital articles (bge-small-en-v1.5)
 * 2. Category sets for all vital articles
 * 3. Scoring parameters (penalties, bonuses, difficulty ranges) derived from
 *    the all-pairs composite similarity distribution.
 *
 * Usage: node scripts/precompute-embeddings.js
 * Output:
 *   src/data/vital-embeddings.bin
 *   src/data/vital-metadata.json
 *   src/data/vital-categories.json
 *   src/data/scoring-params.json
 */

import { pipeline } from '@xenova/transformers';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '..', 'src', 'data');

const WIKI_REST = 'https://en.wikipedia.org/api/rest_v1';
const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const USER_AGENT = 'SnailsTrail/1.0 (build script)';

const EMBEDDING_DIM = 384;
const BATCH_DELAY_MS = 300; // rate-limit delay between API calls
const DIFFICULTY_MAX = { easy: 60, medium: 80, hard: 100 };
// Global scoring range — must match SCORING_SIM_MIN/MAX in src/utils/scoring.js
const SCORING_SIM_MIN = 0.40;
const SCORING_SIM_MAX = 0.75;

const EXCLUDED_CATEGORY_PREFIXES = [
  'Articles ', 'All ', 'CS1 ', 'Webarchive ', 'Pages ', 'Use ',
  'Short description', 'Wikipedia articles', 'Commons category',
  'Articles with', 'Accuracy disputes', 'Cleanup tagged',
  'Wikipedia indefinitely', 'Wikipedia neutral',
  'Good articles', 'Featured articles',
];

// --- API helpers ---

async function fetchSummary(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, '_'));
  const url = `${WIKI_REST}/page/summary/${encoded}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) return { description: '', firstSentence: '' };
      const data = await res.json();
      const description = data.description || '';
      const extract = data.extract || '';
      const match = extract.match(/^[^.]*\./);
      const firstSentence = match ? match[0] : extract.slice(0, 200);
      return { description, firstSentence };
    } catch {
      if (attempt === 2) return { description: '', firstSentence: '' };
      await sleep(1000 * 2 ** attempt);
    }
  }
}

async function fetchCategories(title) {
  const params = new URLSearchParams({
    action: 'query',
    titles: title,
    prop: 'categories',
    cllimit: '50',
    clshow: '!hidden',
    format: 'json',
    origin: '*',
  });
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${WIKI_API}?${params}`, {
        headers: { 'User-Agent': USER_AGENT },
      });
      if (!res.ok) return [];
      const data = await res.json();
      const pages = data.query?.pages || {};
      const page = Object.values(pages)[0];
      if (!page?.categories) return [];
      return page.categories
        .map((c) => c.title.replace(/^Category:/, ''))
        .filter((c) => !EXCLUDED_CATEGORY_PREFIXES.some((p) => c.startsWith(p)));
    } catch {
      if (attempt === 2) return [];
      await sleep(1000 * 2 ** attempt);
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --- Similarity helpers ---

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

function compositeSimilarity(embSim, catSim) {
  return 0.7 * embSim + 0.3 * catSim;
}

// --- Main ---

async function main() {
  const titles = JSON.parse(readFileSync(resolve(DATA_DIR, 'vital-articles.json'), 'utf-8'));
  console.log(`Loaded ${titles.length} vital articles`);

  // 1. Load the embedding model
  console.log('Loading bge-small-en-v1.5 model...');
  const embedder = await pipeline('feature-extraction', 'Xenova/bge-small-en-v1.5');
  console.log('Model loaded.');

  // 2. Fetch metadata and categories, embed each article
  const titleToIndex = {};
  const descriptions = {};
  const firstSentences = {};
  const categories = {};
  const embeddings = new Float32Array(titles.length * EMBEDDING_DIM);

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    titleToIndex[title] = i;

    // Fetch summary
    const summary = await fetchSummary(title);
    descriptions[title] = summary.description;
    firstSentences[title] = summary.firstSentence;

    // Fetch categories
    const cats = await fetchCategories(title);
    categories[title] = cats;

    // Build rich text and embed
    let richParts = title;
    if (summary.description) richParts += ` — ${summary.description}`;
    if (summary.firstSentence) richParts += `. ${summary.firstSentence}`;
    const richText = `passage: ${richParts}`;
    const output = await embedder(richText, { pooling: 'mean', normalize: true });
    const vec = new Float32Array(output.data);
    if (vec.length !== EMBEDDING_DIM) {
      throw new Error(`Expected ${EMBEDDING_DIM}-dim embedding for "${title}", got ${vec.length}`);
    }
    embeddings.set(vec, i * EMBEDDING_DIM);

    if ((i + 1) % 50 === 0 || i === titles.length - 1) {
      console.log(`  [${i + 1}/${titles.length}] ${title}`);
    }

    await sleep(BATCH_DELAY_MS);
  }

  // 3. Compute all-pairs composite similarities for scoring params
  console.log('Computing all-pairs composite similarities...');
  const allCompSims = [];
  for (let i = 0; i < titles.length; i++) {
    for (let j = i + 1; j < titles.length; j++) {
      const embA = embeddings.subarray(i * EMBEDDING_DIM, (i + 1) * EMBEDDING_DIM);
      const embB = embeddings.subarray(j * EMBEDDING_DIM, (j + 1) * EMBEDDING_DIM);
      const embSim = cosineSimilarity(embA, embB);
      const catSim = categoryJaccard(categories[titles[i]], categories[titles[j]]);
      const comp = compositeSimilarity(embSim, catSim);
      allCompSims.push(comp);
    }
  }

  allCompSims.sort((a, b) => a - b);
  const pct = (p) => {
    const idx = Math.min(Math.floor(allCompSims.length * p / 100), allCompSims.length - 1);
    return allCompSims[idx] ?? 0;
  };

  const simRanges = {
    easy: [parseFloat(pct(70).toFixed(4)), parseFloat(pct(95).toFixed(4))],
    medium: [parseFloat(pct(35).toFixed(4)), parseFloat(pct(70).toFixed(4))],
    hard: [parseFloat(pct(5).toFixed(4)), parseFloat(pct(35).toFixed(4))],
  };

  console.log('Similarity ranges:', simRanges);

  // Compute median hop scores per difficulty using global scoring range.
  // Median is the midpoint of the puzzle pair selection range for that difficulty;
  // normalization uses the global [SCORING_SIM_MIN, SCORING_SIM_MAX] range so that
  // median scores reflect gameplay hops, not just the puzzle selection range.
  const medianHopScores = {};
  for (const [diff, [lo, hi]] of Object.entries(simRanges)) {
    const inRange = allCompSims.filter((s) => s >= lo && s <= hi);
    inRange.sort((a, b) => a - b);
    const median = inRange[Math.floor(inRange.length / 2)] || (lo + hi) / 2;
    const norm = Math.max(0, Math.min(1, (median - SCORING_SIM_MIN) / (SCORING_SIM_MAX - SCORING_SIM_MIN)));
    medianHopScores[diff] = Math.round(norm * DIFFICULTY_MAX[diff]);
  }

  console.log('Median hop scores:', medianHopScores);

  // Derive scoring params as fractions of DIFFICULTY_MAX (not median hop scores).
  // Using DIFFICULTY_MAX ensures penalties remain meaningful regardless of where the
  // median hop falls in the global scoring range. Fractions are calibrated so that:
  //   - sniff costs ~1 below-average hop (10-20% of max)
  //   - scout costs ~2-4 typical hops (25-52% of max)
  //   - showMore costs ~1 typical hop for medium/hard (9/8% of max)
  //   - hopSavedBase and escalation scale with medium max (35%/11%)
  const scoringParams = {
    simRanges,
    sniffPenalty: {
      easy: Math.round(DIFFICULTY_MAX.easy * 0.10),
      medium: Math.round(DIFFICULTY_MAX.medium * 0.20),
      hard: Math.round(DIFFICULTY_MAX.hard * 0.20),
    },
    scoutPenalty: {
      easy: Math.round(DIFFICULTY_MAX.easy * 0.25),
      medium: Math.round(DIFFICULTY_MAX.medium * 0.525),
      hard: Math.round(DIFFICULTY_MAX.hard * 0.50),
    },
    hopSavedBase: Math.round(DIFFICULTY_MAX.medium * 0.35),
    hopSavedEscalation: Math.round(DIFFICULTY_MAX.medium * 0.1125),
    showMorePenalty: {
      easy: 0,
      medium: Math.round(DIFFICULTY_MAX.medium * 0.0875),
      hard: Math.round(DIFFICULTY_MAX.hard * 0.08),
    },
  };

  console.log('Scoring params:', scoringParams);

  // 4. Write output files
  const embBuf = Buffer.from(embeddings.buffer);
  writeFileSync(resolve(DATA_DIR, 'vital-embeddings.bin'), embBuf);
  console.log(`Wrote vital-embeddings.bin (${(embBuf.length / 1024).toFixed(0)} KB)`);

  writeFileSync(
    resolve(DATA_DIR, 'vital-metadata.json'),
    JSON.stringify({ titleToIndex, descriptions, firstSentences }, null, 2) + '\n'
  );
  console.log('Wrote vital-metadata.json');

  writeFileSync(
    resolve(DATA_DIR, 'vital-categories.json'),
    JSON.stringify(categories, null, 2) + '\n'
  );
  console.log('Wrote vital-categories.json');

  writeFileSync(
    resolve(DATA_DIR, 'scoring-params.json'),
    JSON.stringify(scoringParams, null, 2) + '\n'
  );
  console.log('Wrote scoring-params.json');

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Precompute failed:', err);
  process.exit(1);
});
