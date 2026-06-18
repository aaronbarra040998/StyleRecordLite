import { t } from "../i18n.mjs";

export function initRoleView(container) {
  container.innerHTML = `
    <section class="role-selection">
      <!-- Header with animation -->
      <div class="role-header">
        <div class="role-brand">
          <span class="material-symbols-outlined">spa</span>
          <h1>StyleRecord</h1>
        </div>
        <h2 class="role-heading">${t('login')}</h2>
        <p class="role-subtitle">Choose how you want to access</p>
      </div>

      <!-- Role cards -->
      <div class="role-cards">
        <!-- Professional -->
        <button class="role-card" id="role-professional" aria-label="${t('professional')}">
          <div class="role-icon professional">
            <span class="material-symbols-outlined" style="font-size:36px;">content_cut</span>
          </div>
          <div class="role-info">
            <h2 class="role-card-title professional">${t('professional')}</h2>
            <p class="role-card-desc">Manage your clients, save visual histories and optimize your schedule.</p>
          </div>
          <span class="material-symbols-outlined role-chevron">chevron_right</span>
        </button>

        <!-- Client -->
        <button class="role-card" id="role-client" aria-label="${t('client')}">
          <div class="role-icon client">
            <span class="material-symbols-outlined" style="font-size:36px;">group</span>
          </div>
          <div class="role-info">
            <h2 class="role-card-title client">${t('client')}</h2>
            <p class="role-card-desc">View your service history, book appointments and share your profile.</p>
          </div>
          <span class="material-symbols-outlined role-chevron">chevron_right</span>
        </button>
      </div>

      <!-- Registration link -->
      <a class="role-register-link" href="#/register">
        Don't have an account? Sign up now
      </a>

      <!-- Security badge -->
      <div class="role-security-badge">
        <span class="material-symbols-outlined">lock</span>
        <span>Secure access with SSL encryption</span>
      </div>

      <!-- Decorative image (mobile only) -->
      <div class="role-decorative-image">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
             alt="Beauty salon environment" 
             loading="lazy" />
      </div>
    </section>
  `;

  // Navigation events
  document.getElementById('role-professional').addEventListener('click', () => {
    window.location.hash = '/login?role=professional';
  });
  document.getElementById('role-client').addEventListener('click', () => {
    window.location.hash = '/login?role=client';
  });

  // Accessibility: allow Enter/Space on cards
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}