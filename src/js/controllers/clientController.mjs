import { getClientByPhone } from '../storage.mjs';
import { getServicesByClientId } from '../serviceManager.mjs';
import { generateShareToken } from '../shareProfile.mjs';
import { showToast } from '../toast.mjs';
import { escapeHtml, formatDate } from '../utils.mjs';
import { logout } from '../auth.mjs';

export async function initClientView(container) {
  const phone = localStorage.getItem('sr-client-phone');
  if (!phone) {
    container.innerHTML = `<p class="login-support">Client session not found.</p>`;
    return;
  }

  const client = await getClientByPhone(phone);
  if (!client) {
    container.innerHTML = `<p class="login-support">Client profile not found.</p>`;
    return;
  }

  const services = await getServicesByClientId(client.id);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalServices = services.length;
  const memberSince = services.length > 0 
    ? new Date(sorted[sorted.length - 1].date).getFullYear() 
    : new Date().getFullYear();

  // Generate share URL
  const token = generateShareToken(client.id);
  const shareUrl = `${window.location.origin}${window.location.pathname}?token=${token}`;

  container.innerHTML = `
    <section class="client-panel">
      <!-- Panel header -->
      <div class="client-panel-header">
        <div>
          <h1 class="client-panel-title">My Service History</h1>
          <p class="client-panel-subtitle">Welcome back, a detailed record of your aesthetic evolution.</p>
        </div>
        <button class="btn-logout-client" id="btn-client-logout">
          <span class="material-symbols-outlined">logout</span>
          Log out
        </button>
      </div>

      <!-- 2-column layout -->
      <div class="client-layout">
        <!-- Main column: service list -->
        <div class="client-services-col">
          <div class="timeline-line"></div>
          ${sorted.length === 0 ? `
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>You have no services registered yet</h3>
              <p>Your history will appear here when your professional logs services.</p>
            </div>
          ` : sorted.map(service => renderClientServiceCard(service)).join('')}
        </div>

        <!-- Sidebar column: profile + actions -->
        <div class="client-sidebar-col">
          <!-- Client profile -->
          <div class="client-profile-card">
            <div class="client-profile-avatar">
              ${getInitials(client.name)}
            </div>
            <div class="client-profile-info">
              <h2 class="client-profile-name">${escapeHtml(client.name)}</h2>
              <span class="client-profile-badge">Elite Client</span>
            </div>
            <hr class="profile-divider" />
            <div class="client-stats">
              <div class="stat-item">
                <span class="stat-label">Member since</span>
                <span class="stat-value">${memberSince}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Services</span>
                <span class="stat-value">${totalServices}</span>
              </div>
            </div>
          </div>

          <!-- Next appointment (placeholder) -->
          <div class="next-appointment-card">
            <div class="appointment-header">
              <span class="material-symbols-outlined">calendar_today</span>
              <h4>Next Appointment</h4>
            </div>
            <p class="appointment-date">Not scheduled</p>
            <p class="appointment-service">Request an appointment with your professional</p>
            <button class="btn-appointment" disabled>Reschedule</button>
          </div>

          <!-- Share profile -->
          <div class="share-profile-card">
            <div class="share-header">
              <span class="material-symbols-outlined">ios_share</span>
              <h4>Share Progress</h4>
            </div>
            <p>Want to show your progress to your stylist or friends? Share your profile securely.</p>
            <button class="btn-share-profile" id="btn-share-profile">
              <span class="material-symbols-outlined">share</span>
              Share Profile
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
      <img class="lightbox-image" id="lightbox-image" src="" alt="Enlarged view" />
    </div>
  `;

  // Logout event
  document.getElementById('btn-client-logout').addEventListener('click', () => {
    logout();
    window.location.hash = '/home';
  });

  // Share profile event
  document.getElementById('btn-share-profile').addEventListener('click', () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Profile link copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Could not copy link', 'error');
    });
  });

  // Lightbox events
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');

  // Open lightbox on image click
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

  // Close lightbox
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

// ─── Render a service card ───
function renderClientServiceCard(service) {
  const dateObj = new Date(service.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Available images
  const images = [];
  if (service.beforeImg) images.push({ src: service.beforeImg, label: 'BEFORE' });
  if (service.afterImg) images.push({ src: service.afterImg, label: 'AFTER' });
  if (service.afterLateralImg) images.push({ src: service.afterLateralImg, label: 'SIDE' });

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
          <p class="notes-title">Professional's Notes</p>
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
        <span class="service-status-badge">Completed</span>
      </div>
      <h3 class="service-type-title">${escapeHtml(service.type)}</h3>
      ${imagesHtml}
      ${notesHtml}
    </div>
  `;
}

// ─── Get initials from name ───
function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}