import { getClientById } from '../storage.mjs';
import { getServicesByClientId } from '../serviceManager.mjs';
import { validateShareToken } from '../shareProfile.mjs';
import { escapeHtml } from '../utils.mjs';

export async function initSharedView(container, token) {
  const clientId = validateShareToken(token);

  // Si el token no es válido o expiró
  if (!clientId) {
    container.innerHTML = `
      <section class="shared-error">
        <div class="shared-error-card">
          <span class="material-symbols-outlined">link_off</span>
          <h2>Enlace expirado o inválido</h2>
          <p>Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.</p>
          <a href="/" class="btn-primary-hero">Volver al inicio</a>
        </div>
      </section>`;
    return;
  }

  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = `<p>Perfil no encontrado.</p>`;
    return;
  }

  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalServices = services.length;
  const lastService = sorted.length > 0 ? sorted[0] : null;

  container.innerHTML = `
    <!-- Banner de expiración -->
    <div class="expiration-banner">
      <span class="material-symbols-outlined">schedule</span>
      <span class="expiration-text">Vista temporal – Este enlace expirará</span>
      <span class="expiration-countdown" id="expiration-countdown">--:--:--</span>
    </div>

    <section class="shared-panel">
      <!-- Cabecera del perfil -->
      <div class="shared-header">
        <div class="shared-header-info">
          <h1 class="shared-title">Historial de <span class="text-primary">${escapeHtml(client.name)}</span></h1>
          <p class="shared-subtitle">
            Registro detallado de tratamientos estéticos y evolución de servicios realizados en nuestro salón.
          </p>
        </div>
        <button class="btn-outline-shared" id="btn-download-pdf" disabled>
          <span class="material-symbols-outlined">download</span>
          Descargar PDF
        </button>
      </div>

      <!-- Layout principal -->
      <div class="shared-layout">
        <!-- Barra lateral: resumen -->
        <aside class="shared-sidebar">
          <div class="summary-card">
            <h3 class="summary-title">Resumen de Cliente</h3>
            <div class="summary-row">
              <span>Última Visita</span>
              <span class="font-semibold">${lastService ? formatDateSpanish(lastService.date) : '—'}</span>
            </div>
            <div class="summary-row">
              <span>Servicios Totales</span>
              <span class="font-semibold">${totalServices} sesiones</span>
            </div>
            <div class="summary-row">
              <span>Preferencia</span>
              <span class="font-semibold text-tertiary">Tintes Orgánicos</span>
            </div>
          </div>
          <div class="decorative-image-card">
            <img src="https://picsum.photos/seed/salon/600/400" alt="Salón profesional" loading="lazy" />
            <div class="decorative-overlay">
              <p class="font-headline-md">Tu Estilo, Tu Registro</p>
              <p class="font-body-sm">Acceso seguro a tu historial de belleza.</p>
            </div>
          </div>
        </aside>

        <!-- Lista de servicios -->
        <div class="shared-services-list">
          ${sorted.length === 0 ? `
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>No hay servicios registrados</h3>
            </div>
          ` : sorted.map(s => renderSharedServiceCard(s)).join('')}
        </div>
      </div>
    </section>
  `;

  // Iniciar cuenta regresiva
  startCountdown();

  // Micro-interacciones en tarjetas
  document.querySelectorAll('.shared-service-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('elevated'));
    card.addEventListener('mouseleave', () => card.classList.remove('elevated'));
  });
}

// ─── Renderiza una tarjeta de servicio ───
function renderSharedServiceCard(service) {
  const date = new Date(service.date);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'short' });
  const year = date.getFullYear();

  return `
    <div class="shared-service-card">
      <div class="service-date-block">
        <span class="service-day-number">${day}</span>
        <span class="service-month-label">${month} ${year}</span>
      </div>
      <div class="service-content">
        <div class="service-header-row">
          <h4 class="service-name">${escapeHtml(service.type)}</h4>
          <span class="service-status">Completado</span>
        </div>
        <p class="service-description">${escapeHtml(service.notes || 'Sin notas adicionales.')}</p>
        ${service.beforeImg || service.afterImg ? `
        <div class="service-tags">
          ${service.beforeImg ? `<span class="service-tag"><span class="material-symbols-outlined">photo_camera</span> Antes</span>` : ''}
          ${service.afterImg ? `<span class="service-tag"><span class="material-symbols-outlined">checkroom</span> Después</span>` : ''}
        </div>` : ''}
      </div>
    </div>
  `;
}

// ─── Formato de fecha legible ───
function formatDateSpanish(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Cuenta regresiva del banner ───
function startCountdown() {
  const el = document.getElementById('expiration-countdown');
  if (!el) return;

  function update() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const diff = end - now;
    if (diff <= 0) {
      el.textContent = 'Expirado';
      return;
    }
    const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update, 1000);
}