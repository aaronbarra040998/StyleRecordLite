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
      <div class="login-card">
        <div class="login-icon-circle">
          <span class="material-symbols-outlined" style="font-size:32px;">content_cut</span>
        </div>
        <h1 class="login-title">Acceso Profesional</h1>
        <p class="login-subtitle">Ingresa tus credenciales para gestionar tu salón.</p>
        <form id="login-form">
          <div class="login-form-group">
            <label for="prof-code">Código de Profesional</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined">lock</span>
              <input type="password" id="prof-code" placeholder="Código" required autofocus />
            </div>
          </div>
          <button type="submit" class="btn-login-submit">
            <span>Ingresar</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
        <div class="login-links">
          <a href="#/register">¿No tienes cuenta? <strong style="color: var(--color-primary);">Regístrate</strong></a>
          <a href="#/rol">
            <span class="material-symbols-outlined" style="font-size:18px;">keyboard_backspace</span>
            Volver a selección de rol
          </a>
        </div>
      </div>
      <p class="login-support">¿Problemas con tu código? Contacta a soporte técnico.</p>
    </section>
  `;

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
  // Generar imágenes placeholder aleatorias
  const imgSalon = getPlaceholderImage(600, 400, 'salon');
  const imgProductos = getPlaceholderImage(600, 600, 'productos');

  const countryOptions = countries
    .map(c => `<option value="${c.dialCode}" ${c.code === 'PE' ? 'selected' : ''}>${c.flag} ${c.name} (${c.dialCode})</option>`)
    .join('');

  container.innerHTML = `
    <section class="login-view active" style="max-width:100%; padding:0;">
      <div class="login-client-container">
        <!-- Columna visual (escritorio) -->
        <div class="login-client-visual">
          <div class="visual-grid">
            <div class="visual-img-wrapper">
              <img src="${imgSalon}" alt="Salón moderno" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
            <div class="visual-img-wrapper">
              <img src="${imgProductos}" alt="Productos de belleza" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
          </div>
          <div class="visual-text-card">
            <h2>Tu historial de belleza, en un solo lugar.</h2>
            <p>Accede a tus citas pasadas, tratamientos realizados y recomendaciones personalizadas.</p>
            <span class="material-symbols-outlined watermark">content_cut</span>
          </div>
        </div>

        <!-- Columna del formulario -->
        <div class="login-client-form-col">
          <div class="login-card">
            <div class="login-icon-circle">
              <span class="material-symbols-outlined" style="font-size:32px;">group</span>
            </div>
            <h1 class="login-title">Acceso Cliente</h1>
            <p class="login-subtitle">Ingresa tu número de teléfono para continuar.</p>
            <form id="login-form">
              <div class="login-form-group">
                <label for="country-select">País</label>
                <div class="select-wrapper">
                  <select id="country-select" required>
                    ${countryOptions}
                  </select>
                  <span class="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <div class="login-form-group">
                <label for="login-phone">Número de Teléfono</label>
                <div class="input-with-icon">
                  <span class="material-symbols-outlined">smartphone</span>
                  <input type="tel" id="login-phone" placeholder="987 654 321" required autofocus />
                </div>
              </div>
              <button type="submit" class="btn-login-submit luxury-gradient">
                <span>Ver historial</span>
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            <div class="login-links">
              <a href="#/rol">
                <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
                Volver a selección de rol
              </a>
              <p style="font-size:0.875rem; color:var(--color-on-surface-variant);">
                ¿Eres un profesional? <a href="#/login?role=professional" style="color:var(--color-tertiary); font-weight:bold;">Acceso Business</a>
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