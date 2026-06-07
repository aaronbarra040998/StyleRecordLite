import { loadClients, getClientByPhone } from "./storage.mjs";

// Lista de clientes (profesional)
export function renderClientList(container) {
  const clients = loadClients();
  if (clients.length === 0) {
    container.innerHTML = "<p>No hay clientes registrados.</p>";
    return;
  }
  const html = clients.map(c => `
    <div class="card" data-id="${c.id}">
      <i class="fas fa-user-circle"></i>
      <div>
        <strong>${c.name}</strong><br>
        <small>${c.phone} ${c.phoneValid ? '✓' : '✗'}</small>
      </div>
    </div>
  `).join("");
  container.innerHTML = html;
}

// Historial de servicios (cliente)
export function renderClientHistory(phone, container) {
  const client = getClientByPhone(phone);
  if (!client || client.services.length === 0) {
    container.innerHTML = "<p>No tienes servicios registrados aún.</p>";
    return;
  }
  // Ordenar cronológicamente
  const sorted = [...client.services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const html = sorted.map(service => `
    <div class="card">
      <i class="fas fa-spa"></i>
      <div>
        <strong>${service.type}</strong> – ${service.date}<br>
        <small>${service.notes}</small><br>
        <div class="image-pair">
          <img src="${service.beforeImg}" alt="Antes" loading="lazy" />
          <img src="${service.afterImg}" alt="Después" loading="lazy" />
        </div>
      </div>
    </div>
  `).join("");
  container.innerHTML = html;
}

// Modal helpers
export function showModal(title, contentHtml) {
  const overlay = document.querySelector("#modal-overlay");
  const body = document.querySelector("#modal-body");
  body.innerHTML = `<h3>${title}</h3>${contentHtml}`;
  overlay.classList.remove("hidden");
}

export function hideModal() {
  document.querySelector("#modal-overlay").classList.add("hidden");
}