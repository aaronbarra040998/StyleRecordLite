import { getClientByPhone } from '../storage.mjs';
import { getServicesByClientId } from '../serviceManager.mjs';
import { generateShareToken } from '../shareProfile.mjs';
import { showToast } from '../toast.mjs';
import { escapeHtml, formatDate } from '../utils.mjs';
import { logout } from '../auth.mjs';

export async function initClientView(container) {
  const phone = localStorage.getItem('sr-client-phone');
  if (!phone) {
    container.innerHTML = `<p class="login-support">No se encontró sesión de cliente.</p>`;
    return;
  }

  const client = await getClientByPhone(phone);
  if (!client) {
    container.innerHTML = `<p class="login-support">Perfil de cliente no encontrado.</p>`;
    return;
  }

  const services = await getServicesByClientId(client.id);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalServices = services.length;
  const memberSince = services.length > 0 
    ? new Date(sorted[sorted.length - 1].date).getFullYear() 
    : new Date().getFullYear();

  // Generar URL para compartir
  const token = generateShareToken(client.id);
  const shareUrl = `${window.location.origin}${window.location.pathname}?token=${token}`;

  container.innerHTML = `
    <section class="client-panel">
      <!-- Header del panel -->
      <div class="client-panel-header">
        <div>
          <h1 class="client-panel-title">Historial de mis servicios</h1>
          <p class="client-panel-subtitle">Bienvenida de nuevo, un registro detallado de tu evolución estética.</p>
        </div>
        <button class="btn-logout-client" id="btn-client-logout">
          <span class="material-symbols-outlined">logout</span>
          Salir
        </button>
      </div>

      <!-- Layout de 2 columnas -->
      <div class="client-layout">
        <!-- Columna principal: lista de servicios -->
        <div class="client-services-col">
          <div class="timeline-line"></div>
          ${sorted.length === 0 ? `
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>No tienes servicios registrados aún</h3>
              <p>Tu historial aparecerá aquí cuando tu profesional registre servicios.</p>
            </div>
          ` : sorted.map(service => renderClientServiceCard(service)).join('')}
        </div>

        <!-- Columna lateral: perfil + acciones -->
        <div class="client-sidebar-col">
          <!-- Perfil del cliente -->
          <div class="client-profile-card">
            <div class="client-profile-avatar">
              ${getInitials(client.name)}
            </div>
            <div class="client-profile-info">
              <h2 class="client-profile-name">${escapeHtml(client.name)}</h2>
              <span class="client-profile-badge">Clienta Elite</span>
            </div>
            <hr class="profile-divider" />
            <div class="client-stats">
              <div class="stat-item">
                <span class="stat-label">Miembro desde</span>
                <span class="stat-value">${memberSince}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Servicios</span>
                <span class="stat-value">${totalServices}</span>
              </div>
            </div>
          </div>

          <!-- Próxima cita (placeholder) -->
          <div class="next-appointment-card">
            <div class="appointment-header">
              <span class="material-symbols-outlined">calendar_today</span>
              <h4>Próxima Cita</h4>
            </div>
            <p class="appointment-date">No programada</p>
            <p class="appointment-service">Solicita una cita con tu profesional</p>
            <button class="btn-appointment" disabled>Reprogramar</button>
          </div>

          <!-- Compartir perfil -->
          <div class="share-profile-card">
            <div class="share-header">
              <span class="material-symbols-outlined">ios_share</span>
              <h4>Compartir Evolución</h4>
            </div>
            <p>¿Quieres mostrar tu evolución a tu estilista o amigas? Comparte tu perfil de forma segura.</p>
            <button class="btn-share-profile" id="btn-share-profile">
              <span class="material-symbols-outlined">share</span>
              Compartir Perfil
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox-overlay hidden" id="lightbox-overlay">
      <button class="lightbox-close-btn" id="lightbox-close">
        <span class="material-symbols-outlined">close</span>
      </button>
      <img class="lightbox-image" id="lightbox-image" src="" alt="Vista ampliada" />
    </div>
  `;

  // Evento de logout
  document.getElementById('btn-client-logout').addEventListener('click', () => {
    logout();
    window.location.hash = '/home';
  });

  // Evento de compartir perfil
  document.getElementById('btn-share-profile').addEventListener('click', () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('¡Enlace de perfil copiado al portapapeles!', 'success');
    }).catch(() => {
      showToast('No se pudo copiar el enlace', 'error');
    });
  });

  // Eventos del lightbox
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');

  // Abrir lightbox al hacer clic en imágenes
  container.querySelectorAll('.service-image-clickable').forEach(img => {
    img.addEventListener('click', (e) => {
      const src = e.currentTarget.querySelector('img')?.src;
      if (src) {
        lightboxImage.src = src;
        lightboxOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Cerrar lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxOverlay.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightboxOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// ─── Renderiza una tarjeta de servicio ───
function renderClientServiceCard(service) {
  const dateObj = new Date(service.date);
  const formattedDate = dateObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Imágenes disponibles
  const images = [];
  if (service.beforeImg) images.push({ src: service.beforeImg, label: 'ANTES' });
  if (service.afterImg) images.push({ src: service.afterImg, label: 'DESPUÉS' });
  if (service.afterLateralImg) images.push({ src: service.afterLateralImg, label: 'LATERAL' });

  const imagesHtml = images.length > 0 
    ? `
      <div class="service-images-client">
        ${images.map(img => `
          <div class="service-image-clickable">
            <img src="${escapeHtml(img.src)}" alt="${img.label}" loading="lazy" />
            <span class="image-badge">${img.label}</span>
          </div>
        `).join('')}
      </div>`
    : '';

  const notesHtml = service.notes 
    ? `
      <div class="service-notes-client">
        <span class="material-symbols-outlined">format_quote</span>
        <div>
          <p class="notes-title">Notas del profesional</p>
          <p class="notes-text">"${escapeHtml(service.notes)}"</p>
        </div>
      </div>`
    : '';

  return `
    <div class="client-service-card">
      <div class="service-card-top">
        <div class="service-date-row">
          <div class="date-icon-circle">
            <span class="material-symbols-outlined">calendar_today</span>
          </div>
          <span class="service-date-text">${formattedDate}</span>
        </div>
        <span class="service-status-badge">Finalizado</span>
      </div>
      <h3 class="service-type-title">${escapeHtml(service.type)}</h3>
      ${imagesHtml}
      ${notesHtml}
    </div>
  `;
}

// ─── Obtener iniciales del nombre ───
function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}