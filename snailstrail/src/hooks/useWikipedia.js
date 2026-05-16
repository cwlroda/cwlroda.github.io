import { useRef, useCallback } from 'react';
import { filterCategories } from '../utils/categories.js';
import { parseSection as sharedParseSection, normalizeTitle } from '../utils/parseSection.js';

const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const BFS_MAX_DEPTH = 8;
const BFS_BRANCH_FACTOR = 15;
const MAX_REDIRECT_CHAIN = 8;

const WIKI_REST = 'https://en.wikipedia.org/api/rest_v1';

/**
 * Fetch article summary (description + first sentence) from Wikipedia REST API.
 * Returns { description, firstSentence } or empty strings on failure.
 */
async function fetchSummary(title) {
  try {
    const encoded = encodeURIComponent(title.replace(/ /g, '_'));
    const res = await fetch(`${WIKI_REST}/page/summary/${encoded}`);
    if (!res.ok) return { description: '', firstSentence: '' };
    const data = await res.json();
    const description = data.description || '';
    const extract = data.extract || '';
    const match = extract.match(/^[^.]*\./);
    const firstSentence = match ? match[0] : extract.slice(0, 200);
    return { description, firstSentence };
  } catch {
    return { description: '', firstSentence: '' };
  }
}

// Wrap shared parseSection to provide browser DOMParser
function parseSection(rawHtml) {
  return sharedParseSection(rawHtml, new DOMParser());
}

/**
 * If HTML is a Wikipedia "pure redirect" stub (only redirectMsg), return the
 * target article title. Otherwise null. parse.page stays the redirect title, so
 * we must follow these manually.
 */
function extractPureRedirectTarget(rawHtml) {
  const cleaned = rawHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, 'text/html');
  if (!doc.querySelector('.redirectMsg')) return null;
  const a = doc.querySelector('.redirectMsg a[href^="/wiki/"]');
  if (a) {
    const href = a.getAttribute('href');
    const raw = href.replace('/wiki/', '').split('#')[0];
    return normalizeTitle(raw);
  }
  const link = doc.querySelector('link[rel="mw:PageProp/redirect"][href^="/wiki/"]');
  if (link) {
    const href = link.getAttribute('href');
    const raw = href.replace('/wiki/', '').split('#')[0];
    return normalizeTitle(raw);
  }
  return null;
}

/**
 * Hook providing Wikipedia API interaction utilities.
 */
export function useWikipedia() {
  const articleCache = useRef(new Map());

  const redirectCache = useRef(new Map());

  /**
   * Resolve a Wikipedia title to its canonical article title, following
   * redirects. Uses the lightweight query API with redirects=1 — does NOT
   * populate articleCache. Safe to call during puzzle generation without
   * poisoning later full-article fetches.
   *
   * Returns the normalized input on network/parse failure so callers can
   * treat this as a best-effort resolver.
   */
  const resolveCanonicalTitle = useCallback(async (title) => {
    const key = normalizeTitle(title);
    if (redirectCache.current.has(key)) {
      return redirectCache.current.get(key);
    }
    try {
      const params = new URLSearchParams({
        action: 'query',
        titles: key,
        redirects: '1',
        format: 'json',
        origin: '*',
      });
      const res = await fetch(`${WIKI_API}?${params}`);
      if (!res.ok) {
        redirectCache.current.set(key, key);
        return key;
      }
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {});
      const raw = pages[0]?.title;
      const canonical = raw ? normalizeTitle(raw) : key;
      redirectCache.current.set(key, canonical);
      return canonical;
    } catch {
      redirectCache.current.set(key, key);
      return key;
    }
  }, []);

  /**
   * Fetch article content, fetching up to maxSections sections.
   */
  const fetchArticleContent = useCallback(async (title, maxSections = 4) => {
    const cacheKey = normalizeTitle(title);
    if (articleCache.current.has(cacheKey)) {
      return articleCache.current.get(cacheKey);
    }

    let allHtml = '';
    let allLinks = [];
    const seenLinks = new Set();
    let resolvedTitle = cacheKey;
    let pageTitle = cacheKey;
    let redirectsFollowed = 0;

    for (let section = 0; section < maxSections; section++) {
      const params = new URLSearchParams({
        action: 'parse',
        page: pageTitle,
        prop: 'text',
        section: String(section),
        format: 'json',
        origin: '*',
        disabletoc: '1',
        disableeditsection: '1',
      });

      const res = await fetch(`${WIKI_API}?${params}`);
      if (!res.ok) throw new Error(`Wikipedia API error: ${res.status}`);
      const data = await res.json();

      if (data.error) {
        if (section === 0) throw new Error(`Article not found: ${pageTitle}`);
        break;
      }

      const rawHtml = data.parse?.text?.['*'] || '';

      // Pure redirect pages: API keeps the redirect title and returns only
      // redirect markup — follow the chain and re-fetch section 0 from target.
      if (section === 0) {
        const pureTarget = extractPureRedirectTarget(rawHtml);
        const apiTitle = normalizeTitle(data.parse?.title || '');
        if (
          pureTarget &&
          pureTarget !== apiTitle &&
          redirectsFollowed < MAX_REDIRECT_CHAIN
        ) {
          redirectsFollowed += 1;
          if (articleCache.current.has(pureTarget)) {
            const cached = articleCache.current.get(pureTarget);
            articleCache.current.set(cacheKey, cached);
            return cached;
          }
          pageTitle = pureTarget;
          resolvedTitle = pureTarget;
          section = -1;
          continue;
        }

        if (data.parse?.title) {
          resolvedTitle = normalizeTitle(data.parse.title);
        }
        if (resolvedTitle !== cacheKey && articleCache.current.has(resolvedTitle)) {
          const cached = articleCache.current.get(resolvedTitle);
          articleCache.current.set(cacheKey, cached);
          return cached;
        }
      }

      const parsed = parseSection(rawHtml);

      allHtml += parsed.html;
      for (const link of parsed.links) {
        if (!seenLinks.has(link)) {
          seenLinks.add(link);
          allLinks.push(link);
        }
      }

    }

    // Fetch categories and summary in parallel
    const [cats, summary] = await Promise.all([
      (async () => {
        try {
          const catParams = new URLSearchParams({
            action: 'query',
            titles: resolvedTitle,
            prop: 'categories',
            cllimit: '50',
            clshow: '!hidden',
            format: 'json',
            origin: '*',
          });
          const catRes = await fetch(`${WIKI_API}?${catParams}`);
          if (!catRes.ok) return [];
          const catData = await catRes.json();
          const pages = catData.query?.pages || {};
          const page = Object.values(pages)[0];
          if (!page?.categories) return [];
          return filterCategories(page.categories.map((c) => c.title));
        } catch {
          return [];
        }
      })(),
      fetchSummary(resolvedTitle),
    ]);

    const result = {
      title: resolvedTitle,
      html: allHtml,
      links: allLinks,
      categories: cats,
      description: summary.description,
      firstSentence: summary.firstSentence,
    };
    articleCache.current.set(resolvedTitle, result);
    // Also cache under the original title so redirects resolve instantly next time
    if (resolvedTitle !== cacheKey) {
      articleCache.current.set(cacheKey, result);
    }
    return result;
  }, []);

  /**
   * Validate that an article exists and has sufficient links.
   */
  const validateArticle = useCallback(async (title) => {
    try {
      const result = await fetchArticleContent(title);
      return result.links.length >= 5;
    } catch {
      return false;
    }
  }, [fetchArticleContent]);

  /**
   * Validate that both articles in a pair exist and have sufficient links.
   */
  const validatePair = useCallback(async (pair) => {
    const [validA, validB] = await Promise.all([
      validateArticle(pair.start),
      validateArticle(pair.target),
    ]);
    return validA && validB;
  }, [validateArticle]);

  /**
   * BFS to find a hint path from start to target.
   * Uses Wikipedia API to discover links at each level.
   */
  const findHintPath = useCallback(async (start, target, maxDepth = BFS_MAX_DEPTH, branchFactor = BFS_BRANCH_FACTOR) => {
    const normalizedTarget = normalizeTitle(target);
    const queue = [{ title: normalizeTitle(start), path: [normalizeTitle(start)] }];
    const visited = new Set([normalizeTitle(start)]);

    for (let depth = 0; depth < maxDepth && queue.length > 0; depth++) {
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const { title, path } = queue.shift();

        try {
          const article = await fetchArticleContent(title);
          const linksToCheck = article.links.slice(0, branchFactor);

          for (const link of linksToCheck) {
            if (normalizeTitle(link) === normalizedTarget) {
              return [...path, normalizedTarget];
            }
            if (!visited.has(link)) {
              visited.add(link);
              queue.push({ title: link, path: [...path, link] });
            }
          }
        } catch {
          continue;
        }
      }
    }

    return null; // No path found within depth limit
  }, [fetchArticleContent]);

  return {
    fetchArticleContent,
    validateArticle,
    validatePair,
    findHintPath,
    resolveCanonicalTitle,
  };
}

export { normalizeTitle };
