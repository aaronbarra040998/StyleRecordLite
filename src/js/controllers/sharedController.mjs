import { getClientById } from '../storage.mjs';
import { getServicesByClientId } from '../serviceManager.mjs';
import { validateShareToken } from '../shareProfile.mjs';
import { escapeHtml } from '../utils.mjs';

export async function initSharedView(container, token) {
  const clientId = validateShareToken(token);

  // If token is invalid or expired
  if (!clientId) {
    container.innerHTML = `
      <section class="shared-error">
        <div class="shared-error-card">
          <span class="material-symbols-outlined">link_off</span>
          <h2>Expired or invalid link</h2>
          <p>This link has expired (24 hours) or is not correct. Ask your professional for a new link.</p>
          <a href="/" class="btn-primary-hero">Back to home</a>
        </div>
      </section>`;
    return;
  }

  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = `<p>Profile not found.</p>`;
    return;
  }

  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalServices = services.length;
  const lastService = sorted.length > 0 ? sorted[0] : null;

  container.innerHTML = `
    <!-- Expiration banner -->
    <div class="expiration-banner">
      <span class="material-symbols-outlined">schedule</span>
      <span class="expiration-text">Temporary view – This link will expire</span>
      <span class="expiration-countdown" id="expiration-countdown">--:--:--</span>
    </div>

    <section class="shared-panel">
      <!-- Profile header -->
      <div class="shared-header">
        <div class="shared-header-info">
          <h1 class="shared-title">History of <span class="text-primary">${escapeHtml(client.name)}</span></h1>
          <p class="shared-subtitle">
            Detailed record of aesthetic treatments and service evolution performed at our salon.
          </p>
        </div>
        <button class="btn-outline-shared" id="btn-download-pdf" disabled>
          <span class="material-symbols-outlined">download</span>
          Download PDF
        </button>
      </div>

      <!-- Main layout -->
      <div class="shared-layout">
        <!-- Sidebar: summary -->
        <aside class="shared-sidebar">
          <div class="summary-card">
            <h3 class="summary-title">Client Summary</h3>
            <div class="summary-row">
              <span>Last Visit</span>
              <span class="font-semibold">${lastService ? formatDateSpanish(lastService.date) : '—'}</span>
            </div>
            <div class="summary-row">
              <span>Total Services</span>
              <span class="font-semibold">${totalServices} sessions</span>
            </div>
            <div class="summary-row">
              <span>Preference</span>
              <span class="font-semibold text-tertiary">Organic Dyes</span>
            </div>
          </div>
          <div class="decorative-image-card">
            <img src="https://picsum.photos/seed/salon/600/400" alt="Professional salon" loading="lazy" />
            <div class="decorative-overlay">
              <p class="font-headline-md">Your Style, Your Record</p>
              <p class="font-body-sm">Secure access to your beauty history.</p>
            </div>
          </div>
        </aside>

        <!-- Service list -->
        <div class="shared-services-list">
          ${sorted.length === 0 ? `
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>No services registered</h3>
            </div>
          ` : sorted.map(s => renderSharedServiceCard(s)).join('')}
        </div>
      </div>
    </section>
  `;

  // Start countdown
  startCountdown();

  // Micro-interactions on cards
  document.querySelectorAll('.shared-service-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('elevated'));
    card.addEventListener('mouseleave', () => card.classList.remove('elevated'));
  });
}

// ─── Render a service card ───
function renderSharedServiceCard(service) {
  const date = new Date(service.date);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
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
          <span class="service-status">Completed</span>
        </div>
        <p class="service-description">${escapeHtml(service.notes || 'No additional notes.')}</p>
        ${service.beforeImg || service.afterImg ? `
        <div class="service-tags">
          ${service.beforeImg ? `<span class="service-tag"><span class="material-symbols-outlined">photo_camera</span> Before</span>` : ''}
          ${service.afterImg ? `<span class="service-tag"><span class="material-symbols-outlined">checkroom</span> After</span>` : ''}
        </div>` : ''}
      </div>
    </div>
  `;
}

// ─── Readable date formatting ───
function formatDateSpanish(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Countdown in banner ───
function startCountdown() {
  const el = document.getElementById('expiration-countdown');
  if (!el) return;

  function update() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const diff = end - now;
    if (diff <= 0) {
      el.textContent = 'Expired';
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