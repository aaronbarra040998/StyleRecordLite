import { loadClients, getClientByPhone } from "./storage.mjs";
import { getServicesByClientId } from "./serviceManager.mjs";

// ---------------------- Clientes ----------------------
export function renderClientList(container, filterText = "") {
  const clients = loadClients();
  const filtered = filterText
    ? clients.filter(c =>
        c.name.toLowerCase().includes(filterText.toLowerCase()) ||
        c.phone.includes(filterText)
      )
    : clients;

  if (filtered.length === 0) {
    container.innerHTML = "<p>No hay clientes registrados.</p>";
    return;
  }

  const html = filtered.map(c => `
    <div class="card client-card" data-id="${c.id}">
      <i class="fas fa-user-circle"></i>
      <div class="client-info">
        <strong>${c.name}</strong><br>
        <small>${c.phone} ${c.phoneValid ? '✓' : '✗'}</small>
      </div>
      <div class="client-actions">
        <button class="btn-delete-client" data-id="${c.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join("");

  container.innerHTML = html;
}

// ---------------------- Historial de servicios (profesional) ----------------------
export function renderClientServices(clientId, container) {
  const services = getServicesByClientId(clientId);
  if (services.length === 0) {
    container.innerHTML = "<p>Este cliente no tiene servicios registrados.</p>";
    return;
  }

  // Ordenar por fecha descendente
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));

  const html = sorted.map(service => `
    <div class="card service-card" data-service-id="${service.id}">
      <div class="service-header">
        <strong>${service.type}</strong>
        <span>${service.date}</span>
      </div>
      <p>${service.notes}</p>
      <div class="image-pair">
        <div>
          <small>Antes</small>
          <img src="${service.beforeImg}" alt="Antes" loading="lazy" />
        </div>
        <div>
          <small>Después</small>
          <img src="${service.afterImg}" alt="Después" loading="lazy" />
        </div>
      </div>
      <div class="service-actions">
        <button class="btn-edit-service" data-id="${service.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete-service" data-id="${service.id}">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `).join("");

  container.innerHTML = html;
}

// ---------------------- Historial (cliente) ----------------------
export function renderClientHistory(phone, container) {
  const client = getClientByPhone(phone);
  if (!client || client.services.length === 0) {
    container.innerHTML = "<p>No tienes servicios registrados aún.</p>";
    return;
  }

  const sorted = [...client.services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const html = sorted.map(service => `
    <div class="card service-card">
      <div class="service-header">
        <strong>${service.type}</strong>
        <span>${service.date}</span>
      </div>
      <p>${service.notes}</p>
      <div class="image-pair">
        <div>
          <small>Antes</small>
          <img src="${service.beforeImg}" alt="Antes" loading="lazy" />
        </div>
        <div>
          <small>Después</small>
          <img src="${service.afterImg}" alt="Después" loading="lazy" />
        </div>
      </div>
    </div>
  `).join("");

  container.innerHTML = html;
}

// ---------------------- Modal ----------------------
export function showModal(title, contentHtml) {
  const overlay = document.querySelector("#modal-overlay");
  const body = document.querySelector("#modal-body");
  body.innerHTML = `<h3>${title}</h3>${contentHtml}`;
  overlay.classList.remove("hidden");
}

export function hideModal() {
  document.querySelector("#modal-overlay").classList.add("hidden");
}