import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { isHub } from '../data/hubs.js';
import { normalizeTitle } from '../hooks/useWikipedia.js';


function unwrapFragmentAnchors(container) {
  for (const a of [...container.querySelectorAll('a[href*="#"]')]) {
    const parent = a.parentNode;
    if (!parent) continue;
    while (a.firstChild) {
      parent.insertBefore(a.firstChild, a);
    }
    parent.removeChild(a);
  }
}

/**
 * Renders Wikipedia article HTML and intercepts internal link clicks.
 * Hub articles get a warning indicator appended.
 */
export function ArticleSection({ html, links, onHop, onExpand, difficulty, loading, hintedLinks = [], visitedTitles = new Set(), readOnly = false, showMorePenalty = 0 }) {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(null);
  const [totalParagraphs, setTotalParagraphs] = useState(0);
  const [tooltip, setTooltip] = useState(null); // { title, x, y }
  const touchTimerRef = useRef(null);
  const touchStartPos = useRef(null);

  // #fragment / same-page links: plain text only (no <a>, no hop UI)
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    unwrapFragmentAnchors(containerRef.current);
  }, [html]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleClick = (e) => {
      const anchor = e.target.closest('a[href*="/wiki/"]');
      if (!anchor) return;

      e.preventDefault();
      e.stopPropagation();
      if (readOnly) return;

      const href = anchor.getAttribute('href') || '';
      const match = href.match(/\/wiki\/([^#]+)/);
      if (!match) return;

      onHop(normalizeTitle(match[1]));
    };

    const container = containerRef.current;
    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [html, onHop, readOnly]);

  // Mark hub links after render
  useEffect(() => {
    if (!containerRef.current || !difficulty) return;

    containerRef.current.querySelectorAll('a[href*="/wiki/"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const match = href.match(/\/wiki\/([^#]+)/);
      if (!match) return;

      const title = normalizeTitle(match[1]);
      if (isHub(title, difficulty)) {
        // Don't add duplicate indicators
        if (!a.querySelector('.hub-indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'hub-indicator';
          indicator.textContent = ' \u{1F40C}\u26A0\uFE0F';
          indicator.title = 'Well-trodden path — reduced score';
          a.appendChild(indicator);
        }
      }
    });
  }, [html, difficulty]);

  // Apply hint highlighting to links
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear all previous hint classes and badges
    containerRef.current.querySelectorAll('.link--sniffed, .link--scouted, .link--direct').forEach((el) => {
      el.classList.remove('link--sniffed', 'link--scouted', 'link--direct');
    });
    containerRef.current.querySelectorAll('.direct-badge').forEach((el) => el.remove());

    if (hintedLinks.length === 0) return;

    // Build lookup map
    const hintMap = new Map();
    for (const { title, type } of hintedLinks) {
      hintMap.set(title, type);
    }

    containerRef.current.querySelectorAll('a[href*="/wiki/"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const match = href.match(/\/wiki\/([^#]+)/);
      if (!match) return;

      const title = normalizeTitle(match[1]);
      const hintType = hintMap.get(title);
      if (!hintType) return;

      a.classList.add(`link--${hintType}`);

      if (hintType === 'direct' && !a.querySelector('.direct-badge')) {
        const badge = document.createElement('span');
        badge.className = 'direct-badge';
        badge.textContent = ' 1 hop away!';
        a.appendChild(badge);
      }
    });
  }, [html, hintedLinks]);

  // Mark previously visited links (backtrack targets)
  useEffect(() => {
    if (!containerRef.current || visitedTitles.size === 0) {
      // Clear any stale visited markers
      containerRef.current?.querySelectorAll('.link--visited').forEach((el) => {
        el.classList.remove('link--visited');
      });
      containerRef.current?.querySelectorAll('.visited-badge').forEach((el) => el.remove());
      return;
    }

    // Clear previous visited markers
    containerRef.current.querySelectorAll('.link--visited').forEach((el) => {
      el.classList.remove('link--visited');
    });
    containerRef.current.querySelectorAll('.visited-badge').forEach((el) => el.remove());

    containerRef.current.querySelectorAll('a[href*="/wiki/"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const match = href.match(/\/wiki\/([^#]+)/);
      if (!match) return;

      const title = normalizeTitle(match[1]);
      if (visitedTitles.has(title)) {
        a.classList.add('link--visited');
        if (!a.querySelector('.visited-badge')) {
          const badge = document.createElement('span');
          badge.className = 'visited-badge';
          badge.textContent = ' \u21A9';
          a.appendChild(badge);
        }
      }
    });
  }, [html, visitedTitles]);

  // Read-only preview: highlight wiki links but do not navigate
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.querySelectorAll('a.link--preview').forEach((el) => {
      el.classList.remove('link--preview');
    });

    if (!readOnly) return;

    containerRef.current.querySelectorAll('a[href*="/wiki/"]').forEach((a) => {
      a.classList.add('link--preview');
    });
  }, [html, readOnly]);

  // Mobile: tap-and-hold to preview full article title
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const handleTouchStart = (e) => {
      const anchor = e.target.closest('a[href*="/wiki/"]');
      if (!anchor) return;

      const touch = e.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };

      touchTimerRef.current = setTimeout(() => {
        const href = anchor.getAttribute('href') || '';
        const match = href.match(/\/wiki\/([^#]+)/);
        if (!match) return;

        const title = decodeURIComponent(match[1].replace(/_/g, ' '));
        const rect = anchor.getBoundingClientRect();
        setTooltip({
          title,
          x: rect.left + rect.width / 2,
          y: rect.top - 8,
        });
      }, 500);
    };

    const handleTouchMove = (e) => {
      if (!touchStartPos.current || !touchTimerRef.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartPos.current.x;
      const dy = touch.clientY - touchStartPos.current.y;
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
        setTooltip(null);
      }
    };

    const handleTouchEnd = () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
      setTimeout(() => setTooltip(null), 1500);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, [html]);

  // Show/hide paragraphs — all modes start with minimum visible count
  useEffect(() => {
    if (!containerRef.current) return;
    const paragraphs = [...containerRef.current.querySelectorAll('p')].filter(
      (p) => p.textContent.trim()
    );
    const total = paragraphs.length;
    setTotalParagraphs(total);

    // Find minimum paragraph count that exposes at least 1 wiki link
    let count = 0;
    let linksFound = 0;
    for (const p of paragraphs) {
      count++;
      linksFound += p.querySelectorAll('a[href^="/wiki/"]').length;
      if (linksFound >= 1) break;
    }
    const initial = Math.max(1, count);
    setVisibleCount(initial);

    // Direct DOM write is load-bearing: re-apply effect only fires when
    // visibleCount actually changes, so same-count navigations rely on this.
    paragraphs.forEach((p, i) => {
      p.style.display = i < initial ? '' : 'none';
    });
  }, [html]); // difficulty omitted — algorithm is uniform across all modes

  // Re-apply visibility when visibleCount changes
  useEffect(() => {
    if (!containerRef.current || visibleCount === null) return;
    const paragraphs = [...containerRef.current.querySelectorAll('p')].filter(
      (p) => p.textContent.trim()
    );
    paragraphs.forEach((p, i) => {
      p.style.display = i < visibleCount ? '' : 'none';
    });
  }, [visibleCount]);

  // Advance visibleCount to expose paragraphs until at least one new wiki link
  // is revealed, or we've reached the end.
  const expandToNextLink = () => {
    if (!containerRef.current) return;
    const paragraphs = [...containerRef.current.querySelectorAll('p')].filter(
      (p) => p.textContent.trim()
    );
    setVisibleCount((current) => {
      let next = current;
      let linksFound = 0;
      while (next < paragraphs.length) {
        linksFound += paragraphs[next].querySelectorAll('a[href^="/wiki/"]').length;
        next++;
        if (linksFound >= 1) break;
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="article-section article-loading">
        <div className="loading-snail">{'\u{1F40C}'}</div>
        <p>The snail is reading...</p>
      </div>
    );
  }

  return (
    <div className="article-section">
      <div
        ref={containerRef}
        className={`article-content${readOnly ? ' article-content--readonly' : ''}`}
        data-tutorial="article-content"
        dangerouslySetInnerHTML={{ __html: html }} /* sanitized in parseSection */
      />
      {tooltip && (
        <div
          className="link-title-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {tooltip.title}
        </div>
      )}
      {visibleCount < totalParagraphs && !readOnly && (
        <button
          type="button"
          className="article-show-more"
          data-tutorial="article-show-more"
          onClick={() => {
            expandToNextLink();
            onExpand?.();
          }}
        >
          {showMorePenalty > 0
            ? `Show more (-${showMorePenalty} pts)`
            : 'Show more'}
        </button>
      )}
      {visibleCount < totalParagraphs && readOnly && (
        <button
          className="article-show-more article-show-more--readonly"
          type="button"
          onClick={expandToNextLink}
        >
          Show more
        </button>
      )}
    </div>
  );
}
