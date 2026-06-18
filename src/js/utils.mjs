/**
 * General utilities: selectors, templates, header/footer, HTML escaping, debounce, date formatting.
 * @module utils
 */

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const fullPath = import.meta.env.BASE_URL + path.replace(/^\//, '');
  const res = await fetch(fullPath);
  return await res.text();
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("partials/header.html");
  const footerTemplate = await loadTemplate("partials/footer.html");
  const headerEl = qs("#main-header");
  const footerEl = qs("#main-footer");
  renderWithTemplate(headerTemplate, headerEl);
  renderWithTemplate(footerTemplate, footerEl);
}

/**
 * Escapes special characters to prevent XSS when injecting HTML.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Creates a debounced version of a function.
 * @param {Function} fn
 * @param {number} delay ms
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Formats an ISO date (YYYY-MM-DD) to a readable format.
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ✅ New export: base URL for static assets
export const BASE_URL = import.meta.env.BASE_URL;