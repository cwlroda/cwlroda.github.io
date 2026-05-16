/** Namespaces to filter out from wiki links */
const EXCLUDED_PREFIXES = [
  'Wikipedia:', 'Help:', 'Template:', 'Category:', 'Portal:',
  'Talk:', 'User:', 'File:', 'Special:', 'Module:', 'Draft:',
  'MediaWiki:', 'TimedText:', 'Book:',
];

/**
 * Normalize a Wikipedia title: decode URI components, replace underscores with spaces.
 */
export function normalizeTitle(title) {
  return decodeURIComponent(title.replace(/_/g, ' '));
}

/**
 * Parse a section of Wikipedia HTML, extracting text and wiki links.
 * Accepts a DOMParser-compatible parser instance (browser DOMParser or linkedom).
 *
 * @param {string} rawHtml - Raw HTML from Wikipedia API
 * @param {{ parseFromString: Function }} parser - A DOMParser or compatible implementation
 * @returns {{ html: string, links: string[] }}
 */
export function parseSection(rawHtml, parser) {
  const cleaned = rawHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

  const doc = parser.parseFromString(cleaned, 'text/html');

  // Remove noise elements
  const noise = doc.querySelectorAll(
    '.mw-editsection, .reference, .reflist, .navbox, .sidebar, ' +
    '.infobox, .metadata, .noprint, .mw-empty-elt, table.ambox, ' +
    '.hatnote, .shortdescription, style, .mw-references-wrap, ' +
    'img, figure, .thumb, .thumbcaption, figcaption, .image, .mw-file-element, ' +
    '.mw-file-description, .preview-warning, .previewnote, .mbox-small, ' +
    '.mw-ext-cite-error'
  );
  noise.forEach((el) => el.remove());

  // Drop tables, lists, headings, and other non-paragraph blocks
  doc.querySelectorAll(
    'table, ul, ol, dl, blockquote, pre, figure, figcaption, ' +
    'h1, h2, h3, h4, h5, h6, hr, aside, nav, .gallery, .toc, .mw-heading'
  ).forEach((el) => el.remove());

  const out = doc.createElement('div');
  doc.querySelectorAll('p').forEach((p) => {
    if (!p.textContent.trim()) return;
    out.appendChild(p.cloneNode(true));
  });

  const html = out.innerHTML;

  const links = [];
  const seen = new Set();
  out.querySelectorAll('a[href^="/wiki/"]').forEach((a) => {
    const href = a.getAttribute('href');
    const raw = href.replace('/wiki/', '').split('#')[0];
    const title = normalizeTitle(raw);

    if (EXCLUDED_PREFIXES.some((p) => title.startsWith(p))) return;
    if (a.classList.contains('new')) return;

    if (!seen.has(title)) {
      seen.add(title);
      links.push(title);
    }
  });

  return { html, links };
}
