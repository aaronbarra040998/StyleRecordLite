/**
 * Utilidades generales: selectores, plantillas, header/footer, escape HTML, debounce, formato fecha.
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
 * Escapa caracteres especiales para prevenir XSS en inyección de HTML.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Crea una versión debounced de una función.
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
 * Formatea una fecha ISO (YYYY-MM-DD) a formato legible.
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}