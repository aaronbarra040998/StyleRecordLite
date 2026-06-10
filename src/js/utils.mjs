// Utilidades generales
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.innerHTML = template;
  if (callback) callback(data);
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

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}