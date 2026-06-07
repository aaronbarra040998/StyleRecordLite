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
  const res = await fetch(path);
  return await res.text();
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const headerEl = qs("#main-header");
  const footerEl = qs("#main-footer");
  renderWithTemplate(headerTemplate, headerEl);
  renderWithTemplate(footerTemplate, footerEl);
}

export function renderClientList(container) {
  let clients = loadClients();
  // Si no hay clientes, mostramos uno de ejemplo
  if (clients.length === 0) {
    clients = [
      {
        id: "demo-1",
        name: "María García (ejemplo)",
        phone: "+541112345678",
        phoneValid: true,
      }
    ];
  }

  const html = clients.map(c => `
    <div class="card client-card" data-id="${c.id}">
      <h3>${c.name}</h3>
      <p>📞 ${c.phone} ${c.phoneValid ? '✅' : '⚠️'}</p>
      <button class="btn-select-client" data-id="${c.id}">Seleccionar</button>
    </div>
  `).join("");
  container.innerHTML = html;
}