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
            <span>Professional Beauty Management</span>
          </div>
          <h1 class="hero-title">
            Organize your success with <span>StyleRecord</span>
          </h1>
          <p class="hero-subtitle">
            The ultimate platform for aestheticians looking to raise their standards, organize their clientele, and boost their professional growth.
          </p>
          <div class="hero-actions">
            <button class="btn-primary-hero" id="btn-home-cta">
              Get Started
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button class="btn-outline-hero" id="btn-ver-demo">See Demo</button>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-image-wrapper">
            <img src="${BASE_URL}images/imgHome.png" alt="Professional in aesthetic clinic using tablet" />
          </div>
          <div class="hero-floating-badge">
            <div class="icon-circle">
              <span class="material-symbols-outlined">verified</span>
            </div>
            <div>
              <div class="font-bold">Total Confidence</div>
              <div class="text-sm text-on-surface-variant">100% Visual Control</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative background elements -->
      <div class="hero-deco hero-deco-right"></div>
      <div class="hero-deco hero-deco-left"></div>
    </section>

    <!-- Value Props Section -->
    <section class="value-props-section">
      <div class="section-title">
        <h2>Raise Your Service Standard</h2>
        <div class="section-title-divider"></div>
        <p>Tools designed for beauty industry specialists.</p>
      </div>
      <div class="props-grid">
        <div class="prop-card glass-card">
          <div class="prop-icon primary">
            <span class="material-symbols-outlined">group</span>
          </div>
          <h3>Client Management</h3>
          <p>Full control of profiles, preferences, and allergies in one secure, accessible place.</p>
        </div>
        <div class="prop-card glass-card">
          <div class="prop-icon secondary">
            <span class="material-symbols-outlined">photo_library</span>
          </div>
          <h3>Visual History</h3>
          <p>Document treatment evolution with photo galleries for each client.</p>
        </div>
        <div class="prop-card glass-card">
          <div class="prop-icon tertiary">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <h3>Professional Tracking</h3>
          <p>Service analytics and automatic reminders to keep your clients engaged.</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">Salons</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">15k</div>
          <div class="stat-label">Clients</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">98%</div>
          <div class="stat-label">Satisfaction</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Support</div>
        </div>
      </div>
    </section>

    <!-- New section: Featured service (visible only on mobile as a card) -->
    <section class="featured-service-section">
      <h2 class="featured-service-title">Your Services, Professionalized</h2>
      <div class="featured-service-card">
        <div class="featured-service-image">
          <img src="https://picsum.photos/seed/spa/800/400" alt="Professional facial treatment" loading="lazy" />
          <div class="featured-service-price">$85.00</div>
        </div>
        <div class="featured-service-content">
          <div class="featured-service-header">
            <h3>Premium Facial Treatment</h3>
            <span class="material-symbols-outlined featured-service-star">star</span>
          </div>
          <p>Deep cleansing with ultrasound technology and intensive hydration.</p>
          <button class="btn-featured-service">
            See Service Details
          </button>
        </div>
      </div>
    </section>
  `;

  // Button events
  document.getElementById('btn-home-cta').addEventListener('click', () => {
    window.location.hash = '/rol';
  });
  document.getElementById('btn-ver-demo').addEventListener('click', () => {
    window.location.hash = '/login?role=professional';
  });

  // Initialize entrance animations with Intersection Observer
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