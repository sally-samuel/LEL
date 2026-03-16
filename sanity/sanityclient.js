/**
 * sanity-client.js
 * Thin wrapper around the Sanity CDN API for the Levene Energies website.
 *
 * Project ID : ilajnehi
 * API base   : https://ilajnehi.apicdn.sanity.io/v2025-06-01
 */

const SANITY_BASE = 'https://ilajnehi.apicdn.sanity.io/v2025-06-01';
const DATASET     = 'production';

/**
 * Run a GROQ query against the Sanity CDN.
 * @param {string} query  - GROQ query string
 * @param {object} params - optional query parameters
 * @returns {Promise<any>} - parsed result array/object
 */
async function sanityFetch(query, params = {}) {
  const encodedQuery = encodeURIComponent(query);
  let url = `${SANITY_BASE}/data/query/${DATASET}?query=${encodedQuery}`;

  // Append any named $params
  for (const [key, val] of Object.entries(params)) {
    url += `&${encodeURIComponent('$' + key)}=${encodeURIComponent(JSON.stringify(val))}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);
  const json = await res.json();
  return json.result;
}

/**
 * Build a Sanity image URL from an image asset reference.
 * @param {object} imageRef - Sanity image object { asset: { _ref } }
 * @param {object} opts     - { w, h, fit, format, quality }
 * @returns {string} CDN URL
 */
function sanityImageUrl(imageRef, opts = {}) {
  if (!imageRef || !imageRef.asset || !imageRef.asset._ref) return '';
  // _ref format: image-<id>-<dimensions>-<format>
  const ref     = imageRef.asset._ref;
  const [, id, dims, ext] = ref.split('-');
  // dims is e.g. 1920x1080
  const baseUrl = `https://cdn.sanity.io/images/ilajnehi/${DATASET}/${id}-${dims}.${ext}`;
  const params  = new URLSearchParams();
  if (opts.w)       params.set('w', opts.w);
  if (opts.h)       params.set('h', opts.h);
  if (opts.fit)     params.set('fit', opts.fit);
  if (opts.format)  params.set('fm', opts.format);
  if (opts.quality) params.set('q', opts.quality);
  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}

/**
 * Portable-text renderer — converts basic Sanity block array to HTML string.
 * Handles paragraphs, h2/h3, bold, italic, links, and bullet/number lists.
 * Extend as needed for your schema.
 */
function renderPortableText(blocks = []) {
  if (!Array.isArray(blocks)) return '';

  const renderSpan = (span, marks, markDefs) => {
    let text = span.text || '';
    // Apply inline marks
    if (marks && marks.length) {
      marks.forEach(mark => {
        if (mark === 'strong') text = `<strong>${text}</strong>`;
        else if (mark === 'em') text = `<em>${text}</em>`;
        else if (mark === 'underline') text = `<u>${text}</u>`;
        else {
          // Maybe an annotation (link etc.)
          const def = (markDefs || []).find(d => d._key === mark);
          if (def && def._type === 'link') {
            text = `<a href="${def.href}" target="_blank" rel="noopener">${text}</a>`;
          }
        }
      });
    }
    return text;
  };

  let html = '';
  let listMode = null; // 'bullet' | 'number' | null

  const closelist = () => {
    if (listMode === 'bullet')  { html += '</ul>'; listMode = null; }
    if (listMode === 'number')  { html += '</ol>'; listMode = null; }
  };

  blocks.forEach(block => {
    if (block._type !== 'block') { closelist(); return; }

    const text = (block.children || [])
      .map(child => renderSpan(child, child.marks, block.markDefs))
      .join('');

    const style = block.style || 'normal';

    if (block.listItem) {
      const newMode = block.listItem === 'number' ? 'number' : 'bullet';
      if (listMode !== newMode) {
        closelist();
        html += newMode === 'number' ? '<ol>' : '<ul>';
        listMode = newMode;
      }
      html += `<li>${text}</li>`;
      return;
    }

    closelist();

    switch (style) {
      case 'h1': html += `<h1>${text}</h1>`; break;
      case 'h2': html += `<h2>${text}</h2>`; break;
      case 'h3': html += `<h3>${text}</h3>`; break;
      case 'h4': html += `<h4>${text}</h4>`; break;
      case 'blockquote': html += `<blockquote>${text}</blockquote>`; break;
      default:   html += `<p>${text}</p>`;
    }
  });

  closelist();
  return html;
}

// ── Convenience query helpers ────────────────────────────────────────────────

/** Fetch all subsidiaries ordered by _createdAt */
function fetchSubsidiaries() {
  return sanityFetch(`*[_type == "subsidiary"] | order(_createdAt asc) {
    _id, name, sector, slug, description, image, highlights
  }`);
}

/** Fetch all management team members ordered by sortOrder */
function fetchManagement() {
  return sanityFetch(`*[_type == "teamMember"] | order(sortOrder asc) {
    _id, name, role, bio, photo, linkedin
  }`);
}

/** Fetch gallery images */
function fetchGallery(limit = 20) {
  return sanityFetch(
    `*[_type == "galleryImage"] | order(_createdAt desc) [0...$limit] { _id, image, caption }`,
    { limit }
  );
}

/** Fetch events — upcoming first */
function fetchEvents() {
  return sanityFetch(`*[_type == "event"] | order(date asc) {
    _id, title, date, location, description, image
  }`);
}

/** Fetch news/press items, optionally filtered by category */
function fetchNews(category = null, limit = 10) {
  const filter = category
    ? `*[_type == "newsItem" && category == $category]`
    : `*[_type == "newsItem"]`;
  return sanityFetch(
    `${filter} | order(publishedAt desc) [0...$limit] {
      _id, title, publishedAt, category, excerpt, slug, image
    }`,
    category ? { category, limit } : { limit }
  );
}

/** Fetch home page hero slides */
function fetchHeroSlides() {
  return sanityFetch(`*[_type == "heroSlide"] | order(order asc) {
    _id, headline, subheadline, image, ctaLabel, ctaUrl
  }`);
}

export {
  sanityFetch,
  sanityImageUrl,
  renderPortableText,
  fetchSubsidiaries,
  fetchManagement,
  fetchGallery,
  fetchEvents,
  fetchNews,
  fetchHeroSlides,
};