/**
 * One-time build script to compute reachability between vital articles.
 *
 * Crawls Wikipedia articles using the same parseSection() logic as the game,
 * builds per-difficulty directed link graphs, and computes shortest paths
 * between all vital article pairs via BFS.
 *
 * Usage: node scripts/build-reachability.js
 *
 * Options:
 *   --depth N     Intermediate crawl depth (default: 2)
 *   --concurrency N  Max concurrent API requests (default: 10)
 *   --resume      Resume from saved crawl progress
 */

import { parseSection, normalizeTitle } from '../src/utils/parseSection.js';
import { parseHTML } from 'linkedom';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const vitalArticles = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'src', 'data', 'vital-articles.json'), 'utf-8')
);

const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const MAX_SECTIONS_CRAWL = 4; // Always fetch 4 sections, derive subsets
const SECTION_COUNTS = { easy: 3, medium: 2, hard: 4 };
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const CRAWL_PROGRESS_FILE = resolve(__dirname, '..', 'src', 'data', 'crawl-progress.json');
const OUTPUT_FILE = resolve(__dirname, '..', 'src', 'data', 'reachability.json');

// Parse CLI args
const args = process.argv.slice(2);
const DEPTH = parseInt(args[args.indexOf('--depth') + 1]) || 2;
const CONCURRENCY = parseInt(args[args.indexOf('--concurrency') + 1]) || 3;
const RESUME = args.includes('--resume');

// Global rate limiter: enforces a minimum gap between API request initiations.
// Uses a promise chain (FIFO queue) so concurrent workers don't race.
// Wikipedia's throttle limit is ~200 req/min; we target 2 req/sec (500ms gap).
const MIN_REQUEST_GAP_MS = 500;
let lastRequestTime = 0;
let rateLimitQueue = Promise.resolve();

async function rateLimitedFetch(url, options) {
  // Chain onto the current tail of the queue so requests are serialized
  rateLimitQueue = rateLimitQueue.then(async () => {
    const gap = Date.now() - lastRequestTime;
    if (gap < MIN_REQUEST_GAP_MS) await sleep(MIN_REQUEST_GAP_MS - gap);
    lastRequestTime = Date.now();
  });
  await rateLimitQueue;
  return fetch(url, options);
}

/**
 * Create a linkedom DOMParser-compatible wrapper.
 */
function createParser() {
  return {
    parseFromString(html, mimeType) {
      const { document } = parseHTML(html);
      return document;
    },
  };
}

const parser = createParser();

/**
 * Fetch a single section of a Wikipedia article.
 * Handles 429 by reading Retry-After and sleeping automatically.
 */
async function fetchSection(title, section, maxRetries = 8) {
  const params = new URLSearchParams({
    action: 'parse',
    page: title,
    prop: 'text',
    section: String(section),
    format: 'json',
    origin: '*',
    disabletoc: '1',
    disableeditsection: '1',
  });

  const url = `${WIKI_API}?${params}`;
  const headers = {
    'User-Agent': 'SnailsTrail/1.0 (build-reachability; https://github.com/weiloon-datature/pixelcraft)',
  };

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const res = await rateLimitedFetch(url, { headers });

    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('retry-after') || '60', 10);
      const waitMs = (retryAfter + 1) * 1000;
      console.warn(`  Rate limited (429) for "${title}" section ${section} — waiting ${retryAfter + 1}s`);
      await sleep(waitMs);
      continue;
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} for ${title} section ${section}`);
    return res.json();
  }

  throw new Error(`HTTP 429 persisted after ${maxRetries} retries for ${title} section ${section}`);
}

/**
 * Check if HTML is a pure redirect page.
 */
function extractPureRedirectTarget(rawHtml) {
  const cleaned = rawHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
  const doc = parser.parseFromString(cleaned, 'text/html');
  if (!doc.querySelector('.redirectMsg')) return null;
  const a = doc.querySelector('.redirectMsg a[href^="/wiki/"]');
  if (a) {
    const href = a.getAttribute('href');
    const raw = href.replace('/wiki/', '').split('#')[0];
    return normalizeTitle(raw);
  }
  return null;
}

/**
 * Fetch an article and extract per-section links.
 * Returns { resolvedTitle, sectionLinks: [string[]] } where sectionLinks[i]
 * is the array of links from section i.
 */
async function fetchArticle(title) {
  let pageTitle = normalizeTitle(title);
  let redirectsFollowed = 0;

  while (redirectsFollowed < 5) {
    const sectionLinks = [];

    for (let section = 0; section < MAX_SECTIONS_CRAWL; section++) {
      let data;
      try {
        data = await fetchSection(pageTitle, section);
      } catch (err) {
        throw err;
      }

      if (data.error) {
        if (section === 0) return null; // Article not found
        break;
      }

      const rawHtml = data.parse?.text?.['*'] || '';

      // Handle pure redirects
      if (section === 0) {
        const redirectTarget = extractPureRedirectTarget(rawHtml);
        const apiTitle = normalizeTitle(data.parse?.title || '');
        if (redirectTarget && redirectTarget !== apiTitle) {
          pageTitle = redirectTarget;
          redirectsFollowed++;
          break; // restart with new title
        }
        if (data.parse?.title) {
          pageTitle = normalizeTitle(data.parse.title);
        }
      }

      const parsed = parseSection(rawHtml, parser);
      sectionLinks.push(parsed.links);

      // If we completed all sections without redirect, return
      if (section === MAX_SECTIONS_CRAWL - 1) {
        return { resolvedTitle: pageTitle, sectionLinks };
      }
    }

    // If we didn't return, check if we broke out due to redirect
    if (sectionLinks.length > 0 && sectionLinks.length < MAX_SECTIONS_CRAWL) {
      // Partial fetch (article had fewer sections)
      return { resolvedTitle: pageTitle, sectionLinks };
    }
    // Otherwise, loop continues (redirect)
  }

  return null;
}

/**
 * Given sectionLinks arrays, compute per-difficulty deduplicated link lists.
 * sectionLinks[i] = links from section i.
 */
function derivePerDifficultyLinks(sectionLinks) {
  const result = {};
  for (const diff of DIFFICULTIES) {
    const maxSec = SECTION_COUNTS[diff];
    const seen = new Set();
    const links = [];
    for (let i = 0; i < Math.min(maxSec, sectionLinks.length); i++) {
      for (const link of sectionLinks[i]) {
        if (!seen.has(link)) {
          seen.add(link);
          links.push(link);
        }
      }
    }
    result[diff] = links;
  }
  return result;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Process a batch of titles with concurrency limiting.
 */
async function crawlBatch(titles, articleData, onProgress) {
  let completed = 0;
  const total = titles.length;
  const queue = [...titles];

  async function worker() {
    while (queue.length > 0) {
      const title = queue.shift();
      if (articleData.has(title)) {
        completed++;
        continue;
      }

      try {
        const result = await fetchArticle(title);
        if (result) {
          const perDiff = derivePerDifficultyLinks(result.sectionLinks);
          articleData.set(result.resolvedTitle, perDiff);
          // Also map original title if different (redirect)
          if (result.resolvedTitle !== title) {
            articleData.set(title, perDiff);
          }
        }
      } catch (err) {
        console.error(`  Failed to fetch "${title}": ${err.message}`);
      }

      completed++;
      if (completed % 10 === 0 || completed === total) {
        onProgress(completed, total);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
}

/**
 * Run BFS from a source vital article in the given difficulty's graph.
 * Returns a Map of reachable vital articles -> shortest hop count.
 */
function bfs(source, difficultyGraph, vitalSet) {
  const visited = new Set([source]);
  const reachable = new Map();
  let frontier = [source];
  let depth = 0;

  while (frontier.length > 0 && depth < 20) {
    depth++;
    const nextFrontier = [];
    for (const node of frontier) {
      const neighbors = difficultyGraph.get(node) || [];
      for (const neighbor of neighbors) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);

        if (vitalSet.has(neighbor)) {
          reachable.set(neighbor, depth);
        }

        // Only expand nodes that exist in our crawled graph
        if (difficultyGraph.has(neighbor)) {
          nextFrontier.push(neighbor);
        }
      }
    }
    frontier = nextFrontier;
  }

  return reachable;
}

/**
 * Save crawl progress for resumption.
 */
function saveCrawlProgress(articleData) {
  const obj = {};
  for (const [key, val] of articleData) {
    obj[key] = val;
  }
  writeFileSync(CRAWL_PROGRESS_FILE, JSON.stringify(obj));
  console.log(`  Saved crawl progress (${articleData.size} articles)`);
}

/**
 * Load crawl progress if resuming.
 */
function loadCrawlProgress() {
  if (!existsSync(CRAWL_PROGRESS_FILE)) return new Map();
  const obj = JSON.parse(readFileSync(CRAWL_PROGRESS_FILE, 'utf-8'));
  return new Map(Object.entries(obj));
}

async function main() {
  console.log(`\nSnail's Trail — Reachability Builder`);
  console.log(`  Depth: ${DEPTH}, Concurrency: ${CONCURRENCY}, Resume: ${RESUME}\n`);

  // articleData: Map<title, { easy: string[], medium: string[], hard: string[] }>
  const articleData = RESUME ? loadCrawlProgress() : new Map();
  const vitalSet = new Set(vitalArticles.map(normalizeTitle));

  // === Phase 1: Crawl vital articles ===
  console.log(`Phase 1: Crawling ${vitalArticles.length} vital articles...`);
  const vitalTitles = vitalArticles.map(normalizeTitle);
  const uncrawledVital = vitalTitles.filter((t) => !articleData.has(t));
  console.log(`  ${uncrawledVital.length} uncrawled (${vitalTitles.length - uncrawledVital.length} cached)`);

  await crawlBatch(uncrawledVital, articleData, (done, total) => {
    console.log(`  Vital: ${done}/${total}`);
  });

  saveCrawlProgress(articleData);

  // === Phase 2: Crawl intermediate articles ===
  for (let level = 1; level <= DEPTH; level++) {
    console.log(`\nPhase 2 (level ${level}/${DEPTH}): Discovering intermediate articles...`);

    // Collect all links from currently crawled articles that we haven't fetched yet
    const newTitles = new Set();
    for (const [, perDiff] of articleData) {
      // Use hard mode links (4 sections = superset of all difficulties)
      const links = perDiff.hard || [];
      for (const link of links) {
        if (!articleData.has(link)) {
          newTitles.add(link);
        }
      }
    }

    const batch = [...newTitles];
    console.log(`  Found ${batch.length} new articles to crawl`);

    if (batch.length === 0) {
      console.log(`  No new articles — stopping early`);
      break;
    }

    await crawlBatch(batch, articleData, (done, total) => {
      console.log(`  Level ${level}: ${done}/${total}`);
    });

    saveCrawlProgress(articleData);
  }

  console.log(`\nTotal articles crawled: ${articleData.size}`);

  // === Phase 3: Build per-difficulty graphs and compute reachability ===
  console.log(`\nPhase 3: Computing reachability...`);

  const reachability = {};

  for (const diff of DIFFICULTIES) {
    console.log(`  Building ${diff} graph...`);

    // Build adjacency list for this difficulty
    const graph = new Map();
    for (const [title, perDiff] of articleData) {
      graph.set(title, perDiff[diff] || []);
    }

    console.log(`  Running BFS from ${vitalTitles.length} vital articles...`);
    const diffReach = {};
    let reachablePairs = 0;

    for (let i = 0; i < vitalTitles.length; i++) {
      const source = vitalTitles[i];
      const reachableMap = bfs(source, graph, vitalSet);

      if (reachableMap.size > 0) {
        diffReach[source] = {};
        for (const [target, hops] of reachableMap) {
          diffReach[source][target] = hops;
          reachablePairs++;
        }
      }

      if ((i + 1) % 100 === 0 || i === vitalTitles.length - 1) {
        console.log(`    BFS: ${i + 1}/${vitalTitles.length} sources processed`);
      }
    }

    const totalPairs = vitalTitles.length * (vitalTitles.length - 1);
    const coverage = ((reachablePairs / totalPairs) * 100).toFixed(1);
    console.log(`  ${diff}: ${reachablePairs}/${totalPairs} pairs reachable (${coverage}%)`);

    reachability[diff] = diffReach;
  }

  // === Write output ===
  writeFileSync(OUTPUT_FILE, JSON.stringify(reachability));
  const sizeMB = (Buffer.byteLength(JSON.stringify(reachability)) / 1024 / 1024).toFixed(2);
  console.log(`\nWrote reachability data to ${OUTPUT_FILE} (${sizeMB} MB)`);

  // Clean up progress file
  if (existsSync(CRAWL_PROGRESS_FILE)) {
    const { unlinkSync } = await import('fs');
    unlinkSync(CRAWL_PROGRESS_FILE);
    console.log('Cleaned up crawl progress file');
  }
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
