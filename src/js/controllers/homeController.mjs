import { t } from "../i18n.mjs";

export function initHomeView(container) {
  container.innerHTML = `
    <section class="home-hero">
      <div class="home-hero-content">
        <h1 class="home-hero-title">${t('appName')}</h1>
        <p class="home-hero-subtitle">
          Organiza tus clientes, guarda el antes y después de cada servicio y haz crecer tu negocio de estética.
        </p>
        <button class="home-cta" id="btn-home-cta">
          Comenzar <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="home-hero-image">
        <img src="/images/hero.png" alt="StyleRecord Lite – Gestión de servicios" />
      </div>
    </section>

    <section class="home-value-props">
      <div class="home-prop">
        <div class="home-prop-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>Gestión de Clientes</h3>
        <p>Registra y organiza a tus clientes de forma rápida y sencilla.</p>
      </div>
      <div class="home-prop">
        <div class="home-prop-icon">
          <i class="fas fa-camera"></i>
        </div>
        <h3>Historial Visual</h3>
        <p>Guarda fotos del antes y después de cada servicio.</p>
      </div>
      <div class="home-prop">
        <div class="home-prop-icon">
          <i class="fas fa-calendar-check"></i>
        </div>
        <h3>Seguimiento Profesional</h3>
        <p>Revisa el historial completo de cada cliente en cualquier momento.</p>
      </div>
    </section>
  `;

  document.getElementById('btn-home-cta').addEventListener('click', () => {
    window.location.hash = '/rol';
  });
}