import { t } from "../i18n.mjs";
import { BASE_URL } from "../utils.mjs";

export function initHomeView(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section hero-gradient">
      <div class="hero-container">
        <div class="hero-left">
          <div class="hero-badge animate-bounce-slow">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span>Gestión Profesional de Belleza</span>
          </div>
          <h1 class="hero-title">
            Organiza tu éxito con <span>StyleRecord</span>
          </h1>
          <p class="hero-subtitle">
            La plataforma definitiva para esteticistas que buscan elevar su estándar, organizar su clientela y potenciar su crecimiento profesional.
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
      <!-- Elementos decorativos de fondo -->
      <div class="hero-deco hero-deco-right"></div>
      <div class="hero-deco hero-deco-left"></div>
    </section>

    <!-- Value Props Section -->
    <section class="value-props-section">
      <div class="section-title">
        <h2>Eleva tu Estándar de Servicio</h2>
        <div class="section-title-divider"></div>
        <p>Herramientas diseñadas para especialistas del sector estético.</p>
      </div>
      <div class="props-grid">
        <div class="prop-card glass-card">
          <div class="prop-icon primary">
            <span class="material-symbols-outlined">group</span>
          </div>
          <h3>Gestión de Clientes</h3>
          <p>Control total de perfiles, preferencias y alergias en un solo lugar seguro y accesible.</p>
        </div>
        <div class="prop-card glass-card">
          <div class="prop-icon secondary">
            <span class="material-symbols-outlined">photo_library</span>
          </div>
          <h3>Historial Visual</h3>
          <p>Documenta la evolución de tus tratamientos con galerías fotográficas por cada cliente.</p>
        </div>
        <div class="prop-card glass-card">
          <div class="prop-icon tertiary">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <h3>Seguimiento Profesional</h3>
          <p>Analíticas de servicios y recordatorios automáticos para mantener a tus clientes comprometidos.</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">Salones</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">15k</div>
          <div class="stat-label">Clientes</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">98%</div>
          <div class="stat-label">Satisfacción</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Soporte</div>
        </div>
      </div>
    </section>

    <!-- Nueva sección: Servicio destacado (visible solo en móvil como tarjeta) -->
    <section class="featured-service-section">
      <h2 class="featured-service-title">Tus Servicios, Profesionalizados</h2>
      <div class="featured-service-card">
        <div class="featured-service-image">
          <img src="https://picsum.photos/seed/spa/800/400" alt="Tratamiento facial profesional" loading="lazy" />
          <div class="featured-service-price">$85.00</div>
        </div>
        <div class="featured-service-content">
          <div class="featured-service-header">
            <h3>Tratamiento Facial Premium</h3>
            <span class="material-symbols-outlined featured-service-star">star</span>
          </div>
          <p>Limpieza profunda con tecnología ultrasónica e hidratación intensiva.</p>
          <button class="btn-featured-service">
            Ver Detalles del Servicio
          </button>
        </div>
      </div>
    </section>
  `;

  // Eventos de botones
  document.getElementById('btn-home-cta').addEventListener('click', () => {
    window.location.hash = '/rol';
  });
  document.getElementById('btn-ver-demo').addEventListener('click', () => {
    window.location.hash = '/login?role=professional';
  });

  // Inicializar animaciones de entrada con Intersection Observer
  initHomeAnimations();
}

function initHomeAnimations() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .featured-service-card').forEach(card => {
    card.classList.add('reveal-on-scroll');
    observer.observe(card);
  });
}