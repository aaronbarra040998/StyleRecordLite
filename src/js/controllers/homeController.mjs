import { t } from "../i18n.mjs";
import { BASE_URL } from "../utils.mjs";

export function initHomeView(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section hero-gradient">
      <div class="hero-container">
        <div class="hero-left">
          <div class="hero-badge">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span>Gestión Profesional de Belleza</span>
          </div>
          <h1 class="hero-title">
            <span>StyleRecord</span> Lite
          </h1>
          <p class="hero-subtitle">
            Organiza tus clientes, guarda el antes y después de cada servicio y haz crecer tu negocio de estética con nuestra plataforma intuitiva y profesional.
          </p>
          <div class="hero-actions">
            <button class="btn-primary-hero" id="btn-home-cta">
              Comenzar
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button class="btn-outline-hero" id="btn-ver-demo">Ver Demo</button>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-image-wrapper">
            <img src="${BASE_URL}images/imgHome.png" alt="Profesional en clínica de estética usando tablet" />
          </div>
          <div class="hero-floating-badge">
            <div class="icon-circle">
              <span class="material-symbols-outlined">verified</span>
            </div>
            <div>
              <div class="font-bold">Confianza Total</div>
              <div class="text-sm text-on-surface-variant">Control visual 100%</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Props -->
    <section class="value-props-section">
      <div class="section-title">
        <h2>Eleva tu Estándar de Servicio</h2>
        <p>Herramientas diseñadas para especialistas del sector estético.</p>
      </div>
      <div class="props-grid">
        <div class="prop-card">
          <div class="prop-icon primary">
            <span class="material-symbols-outlined" style="font-size:32px;">group</span>
          </div>
          <h3>Gestión de Clientes</h3>
          <p>Base de datos completa con perfiles detallados y recordatorios automáticos.</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon secondary">
            <span class="material-symbols-outlined" style="font-size:32px;">content_cut</span>
          </div>
          <h3>Historial Visual</h3>
          <p>Captura y compara el progreso de tus tratamientos con registros de antes y después.</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon tertiary">
            <span class="material-symbols-outlined" style="font-size:32px;">analytics</span>
          </div>
          <h3>Seguimiento Profesional</h3>
          <p>Analiza el crecimiento de tu negocio en un tablero inteligente.</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="stats-container">
        <div>
          <div class="stat-number">500+</div>
          <div class="stat-label">Salones</div>
        </div>
        <div>
          <div class="stat-number">15k</div>
          <div class="stat-label">Clientes</div>
        </div>
        <div>
          <div class="stat-number">1M</div>
          <div class="stat-label">Fotos</div>
        </div>
        <div>
          <div class="stat-number">98%</div>
          <div class="stat-label">Satisfacción</div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('btn-home-cta').addEventListener('click', () => {
    window.location.hash = '/rol';
  });

  document.getElementById('btn-ver-demo').addEventListener('click', () => {
    // Opcional: redirigir a una demostración o al login
    window.location.hash = '/login?role=professional';
  });
}