import { loadClients, getClientByPhone, getClientById } from "./storage.mjs";
import { getServicesByClientId } from "./serviceManager.mjs";
import { escapeHtml, formatDate } from "./utils.mjs";
import { t } from "./i18n.mjs";
import { openLightbox } from "./lightbox.mjs";

let lastFocusedElement = null;

export function renderServiceCard(service, editable = false) {
  const images = [];
  if (service.beforeImg) images.push(service.beforeImg);
  if (service.afterImg) images.push(service.afterImg);
  if (service.afterLateralImg) images.push(service.afterLateralImg);
  
  const imagesJson = escapeHtml(JSON.stringify(images));

  const lateralImg = service.afterLateralImg || '';
  const lateralHtml = lateralImg
    ? `<div class="image-item" data-index="${images.indexOf(lateralImg)}"><small>Después lateral</small><img src="${escapeHtml(lateralImg)}" alt="Después lateral" loading="lazy" /></div>`
    : `<div class="image-item"><small>Después lateral</small><div class="image-placeholder-small">Sin foto</div></div>`;

  const beforeIdx = images.indexOf(service.beforeImg);
  const afterIdx = images.indexOf(service.afterImg);
  const lateralIdx = images.indexOf(service.afterLateralImg);

  return `
    <div class="card service-card fade-in" data-service-id="${escapeHtml(service.id)}" role="article" aria-label="Servicio ${escapeHtml(service.type)} del ${escapeHtml(service.date)}">
      <div class="service-header">
        <strong>${escapeHtml(service.type)}</strong>
        <span>${escapeHtml(service.date)}</span>
      </div>
      <p>${escapeHtml(service.notes)}</p>
      <div class="image-pair" data-images='${imagesJson}'>
        <div class="image-item" data-index="${beforeIdx >= 0 ? beforeIdx : 0}"><small>Antes</small><img src="${escapeHtml(service.beforeImg)}" alt="Antes" loading="lazy" /></div>
        <div class="image-item" data-index="${afterIdx >= 0 ? afterIdx : 0}"><small>Después frontal</small><img src="${escapeHtml(service.afterImg)}" alt="Después frontal" loading="lazy" /></div>
        ${lateralHtml}
      </div>
      ${editable ? `
      <div class="service-actions">
        <button class="btn-edit-service" data-id="${escapeHtml(service.id)}" aria-label="Editar servicio"><i class="fas fa-edit"></i> Editar</button>
        <button class="btn-delete-service" data-id="${escapeHtml(service.id)}" aria-label="Eliminar servicio"><i class="fas fa-trash"></i> Eliminar</button>
      </div>` : ''}
    </div>
  `;
}

export function renderClientList(container, clients, filterText = "") {
  const filtered = filterText
    ? clients.filter(c =>
        c.name.toLowerCase().includes(filterText.toLowerCase()) ||
        c.phone.includes(filterText)
      )
    : clients;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-users fa-3x"></i>
        <p>${t('noClients')}</p>
        <p class="empty-hint">${t('emptyHint')}</p>
      </div>`;
    return;
  }

  const html = filtered.map(c => {
    const lastService = c.services?.length
      ? c.services.reduce((latest, s) => new Date(s.date) > new Date(latest.date) ? s : latest)
      : null;
    const lastDate = lastService ? formatDate(lastService.date) : 'Sin servicios';
    return `
      <div class="card client-card" data-id="${escapeHtml(c.id)}" tabindex="0" role="button" aria-label="Cliente ${escapeHtml(c.name)}">
        <i class="fas fa-user-circle"></i>
        <div class="client-info">
          <strong>${escapeHtml(c.name)}</strong><br>
          <small>${escapeHtml(c.phone)} ${c.phoneValid ? '✓' : '✗'} · ${lastDate}</small>
        </div>
        <div class="client-actions">
          <button class="btn-edit-client" data-id="${escapeHtml(c.id)}" aria-label="Editar ${escapeHtml(c.name)}"><i class="fas fa-edit"></i></button>
          <button class="btn-delete-client" data-id="${escapeHtml(c.id)}" aria-label="Eliminar ${escapeHtml(c.name)}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = html;
}

export async function renderClientServices(clientId, container) {
  const services = await getServicesByClientId(clientId);
  if (services.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-cut fa-3x"></i>
        <p>${t('noServices')}</p>
        <p class="empty-hint">${t('addServiceHint')}</p>
      </div>`;
    return;
  }
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = sorted.map(s => renderServiceCard(s, true)).join("");
}

export async function renderClientHistory(phone, container) {
  const client = await getClientByPhone(phone);
  if (!client || client.services.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-history fa-3x"></i>
        <p>${t('noHistory')}</p>
      </div>`;
    return;
  }
  const sorted = [...client.services].sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = sorted.map(s => renderServiceCard(s, false)).join("");
}

export async function renderSharedView(clientId, container) {
  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = "<p>Perfil no encontrado.</p>";
    return;
  }
  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const html = `
    <div class="shared-banner" role="alert">
      <i class="fas fa-clock"></i> ${t('sharedBanner')}
    </div>
    <h2>${t('historyOf')} ${escapeHtml(client.name)}</h2>
    ${sorted.length === 0
      ? `<div class="empty-state"><i class="fas fa-cut fa-3x"></i><p>${t('noServices')}</p></div>`
      : sorted.map(s => renderServiceCard(s, false)).join("")}
  `;
  container.innerHTML = html;
}

// ── MODAL GENÉRICO ──
export function showModal(title, contentHtml) {
  const overlay = document.getElementById("modal-overlay");
  const body = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");
  body.innerHTML = `<h3 id="modal-title">${escapeHtml(title)}</h3>${contentHtml}`;
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lastFocusedElement = document.activeElement;
  closeBtn.focus();
  trapFocus(overlay);
}

export function hideModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function trapFocus(overlay) {
  const focusableElements = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      hideModal();
      overlay.removeEventListener('keydown', handleKeyDown);
      return;
    }
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }
  overlay.addEventListener('keydown', handleKeyDown);
}

export function showConfirmModal(message) {
  return new Promise((resolve) => {
    const content = `
      <p>${escapeHtml(message)}</p>
      <div class="confirm-actions">
        <button id="confirm-yes" class="confirm-btn confirm-yes">${t('yes')}</button>
        <button id="confirm-no" class="confirm-btn confirm-no">${t('cancel')}</button>
      </div>
    `;
    showModal(t('confirmTitle'), content);
    document.getElementById('confirm-yes').addEventListener('click', () => {
      hideModal();
      resolve(true);
    });
    document.getElementById('confirm-no').addEventListener('click', () => {
      hideModal();
      resolve(false);
    });
  });
}

// ── LIGHTBOX DELEGATION ──
export function initLightboxDelegation() {
  document.addEventListener('click', (e) => {
    const imgElement = e.target.closest('.image-item img');
    if (!imgElement) return;
    const imageItem = imgElement.closest('.image-item');
    if (!imageItem) return;
    const imagePair = imageItem.closest('.image-pair, .service-images-grid');
    if (!imagePair) return;
    
    const imagesJson = imagePair.getAttribute('data-images');
    if (!imagesJson) return;
    try {
      const images = JSON.parse(imagesJson);
      if (images.length === 0) return;
      const index = parseInt(imageItem.getAttribute('data-index'), 10) || 0;
      openLightbox(images, index);
    } catch (err) {
      // No abrir lightbox si falla el parse
    }
  });
}

// ── SKELETON LOADERS ──
/**
 * Muestra tarjetas de skeleton mientras se cargan los servicios reales.
 * @param {HTMLElement} container - Contenedor donde se insertarán los skeletons.
 * @param {number} count - Número de skeletons a mostrar (por defecto 3).
 */
export function showSkeletonCards(container, count = 3) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="skeleton-card">
        <div class="skeleton-header">
          <div class="skeleton skeleton-date"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton-images">
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton skeleton-img"></div>
        </div>
        <div class="skeleton-notes">
          <div class="skeleton skeleton-notes-bar"></div>
          <div class="skeleton skeleton-notes-text"></div>
        </div>
        <div class="skeleton-actions">
          <div class="skeleton skeleton-btn"></div>
          <div class="skeleton skeleton-btn"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}