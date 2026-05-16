/**
 * Extract the first paragraph from already-parsed article HTML.
 * Uses DOMParser (same as parseSection in useWikipedia) for consistency.
 * Links are converted to non-clickable highlighted spans.
 * @param {string|null} html - Cleaned article HTML (from fetchArticleContent)
 * @returns {string|null} HTML string of first paragraph with highlighted links, or null
 */
export function extractFirstParagraphWithLinks(html) {
  if (!html || typeof html !== 'string') return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Find the first non-empty <p> (same check as ArticleSection)
  const paragraphs = doc.querySelectorAll('p');
  let firstP = null;
  for (const p of paragraphs) {
    if (p.textContent.trim()) {
      firstP = p;
      break;
    }
  }
  if (!firstP) return null;

  // Convert <a> tags to non-clickable highlighted spans
  firstP.querySelectorAll('a').forEach((a) => {
    const span = doc.createElement('span');
    span.className = 'highlighted-link';
    span.innerHTML = a.innerHTML;
    a.replaceWith(span);
  });

  return firstP.innerHTML;
}
