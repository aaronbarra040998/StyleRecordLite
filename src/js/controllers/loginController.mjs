import { loginAsProfessional, loginAsClient } from '../auth.mjs';
import { getClientByPhone } from '../storage.mjs';
import { showError } from '../toast.mjs';
import { t } from '../i18n.mjs';
import countries, { composeFullNumber } from '../countries.mjs';
import { getPlaceholderImage } from '../loremPicsum.mjs';

export function initLoginView(container) {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1] || '');
  const role = params.get('role');

  if (!role || (role !== 'professional' && role !== 'client')) {
    window.location.hash = '/rol';
    return;
  }

  const isProfessional = role === 'professional';

  if (isProfessional) {
    renderProfessionalLogin(container);
  } else {
    renderClientLogin(container);
  }
}

function renderProfessionalLogin(container) {
  container.innerHTML = `
    <section class="login-view active">
      <!-- Decorative backgrounds (visible only on mobile) -->
      <div class="login-decorations" aria-hidden="true">
        <div class="login-deco-circle login-deco-circle--primary"></div>
        <div class="login-deco-circle login-deco-circle--secondary"></div>
        <div class="login-deco-pattern"></div>
      </div>

      <div class="login-card" id="professional-login-card">
        <div class="login-icon-circle">
          <span class="material-symbols-outlined" style="font-size:32px;">content_cut</span>
        </div>
        <h1 class="login-title">Professional Access</h1>
        <p class="login-subtitle">Enter your credentials to manage your salon.</p>
        <form id="login-form">
          <div class="login-form-group">
            <label for="prof-code">Professional Code</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined">lock</span>
              <input type="password" id="prof-code" placeholder="Code" required autofocus />
            </div>
          </div>
          <button type="submit" class="btn-login-submit">
            <span>Sign in</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
        <div class="login-links">
          <a href="#/register">Don't have an account? <strong style="color: var(--color-primary);">Sign up</strong></a>
          <a href="#/rol">
            <span class="material-symbols-outlined" style="font-size:18px;">keyboard_backspace</span>
            Back to role selection
          </a>
        </div>
      </div>
      <p class="login-support">Problems with your code? Contact technical support.</p>
    </section>
  `;

  // Subtle card movement effect with mouse (purely aesthetic)
  const card = document.getElementById('professional-login-card');
  if (card && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;   // ±5px
      const y = (clientY / window.innerHeight - 0.5) * 10;
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Submit event (existing functionality)
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('prof-code').value;
    if (loginAsProfessional(code)) {
      window.location.hash = '/professional';
    } else {
      showError(t('invalidCode'));
    }
  });
}

function renderClientLogin(container) {
  // Generate random placeholder images
  const imgSalon = getPlaceholderImage(600, 400, 'salon');
  const imgProductos = getPlaceholderImage(600, 600, 'productos');

  const countryOptions = countries
    .map(c => `<option value="${c.dialCode}" ${c.code === 'PE' ? 'selected' : ''}>${c.flag} ${c.name} (${c.dialCode})</option>`)
    .join('');

  container.innerHTML = `
    <section class="login-view active" style="max-width:100%; padding:0;">
      <div class="login-client-container">
        <!-- Visual column (desktop) -->
        <div class="login-client-visual">
          <div class="visual-grid">
            <div class="visual-img-wrapper">
              <img src="${imgSalon}" alt="Modern salon" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
            <div class="visual-img-wrapper">
              <img src="${imgProductos}" alt="Beauty products" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
          </div>
          <div class="visual-text-card">
            <h2>Your beauty history, all in one place.</h2>
            <p>Access your past appointments, treatments, and personalized recommendations.</p>
            <span class="material-symbols-outlined watermark">content_cut</span>
          </div>
        </div>

        <!-- Form column -->
        <div class="login-client-form-col">
          <div class="login-card">
            <div class="login-icon-circle">
              <span class="material-symbols-outlined" style="font-size:32px;">group</span>
            </div>
            <h1 class="login-title">Client Access</h1>
            <p class="login-subtitle">Enter your phone number to continue.</p>
            <form id="login-form">
              <div class="login-form-group">
                <label for="country-select">Country</label>
                <div class="select-wrapper">
                  <select id="country-select" required>
                    ${countryOptions}
                  </select>
                  <span class="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <div class="login-form-group">
                <label for="login-phone">Phone Number</label>
                <div class="input-with-icon">
                  <span class="material-symbols-outlined">smartphone</span>
                  <input type="tel" id="login-phone" placeholder="987 654 321" required autofocus />
                </div>
              </div>
              <button type="submit" class="btn-login-submit luxury-gradient">
                <span>See history</span>
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            <div class="login-links">
              <a href="#/rol">
                <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
                Back to role selection
              </a>
              <p style="font-size:0.875rem; color:var(--color-on-surface-variant);">
                Are you a professional? <a href="#/login?role=professional" style="color:var(--color-tertiary); font-weight:bold;">Business Access</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dialCode = document.getElementById('country-select').value;
    const localNumber = document.getElementById('login-phone').value.trim();
    const fullNumber = composeFullNumber(dialCode, localNumber);
    const client = await getClientByPhone(fullNumber);
    if (client) {
      loginAsClient(fullNumber);
      window.location.hash = '/client';
    } else {
      showError(t('noClient'));
    }
  });
}