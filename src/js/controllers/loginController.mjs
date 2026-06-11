import { loginAsProfessional, loginAsClient } from '../auth.mjs';
import { getClientByPhone } from '../storage.mjs';
import { showError } from '../toast.mjs';
import { t } from '../i18n.mjs';
import countries, { composeFullNumber } from '../countries.mjs';

export function initLoginView(container) {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1] || '');
  const role = params.get('role');

  if (!role || (role !== 'professional' && role !== 'client')) {
    window.location.hash = '/rol';
    return;
  }

  const isProfessional = role === 'professional';

  // Construir opciones del selector de país (para cliente)
  const countryOptions = countries
    .map(c => `<option value="${c.dialCode}" ${c.code === 'PE' ? 'selected' : ''}>${c.flag} ${c.name} (${c.dialCode})</option>`)
    .join('');

  container.innerHTML = `
    <section class="login-view active">
      <h2>${isProfessional ? 'Acceso Profesional' : 'Acceso Cliente'}</h2>
      <div class="login-form-container">
        ${isProfessional ? `
          <form id="login-form">
            <label>Código de acceso:</label>
            <input type="password" id="login-code" placeholder="Código" required autofocus />
            <button type="submit">Ingresar</button>
          </form>
          <p class="login-back">
            <a href="#/register">¿No tienes cuenta? Regístrate</a>
          </p>
        ` : `
          <form id="login-form">
            <label>Selecciona tu país:</label>
            <select id="country-select" required style="width:100%; margin-bottom:0.8rem;">
              ${countryOptions}
            </select>
            <label>Número de teléfono (sin código de país):</label>
            <input type="tel" id="login-phone" placeholder="987654321" required autofocus />
            <button type="submit">Ver historial</button>
          </form>
        `}
        <p class="login-back">
          <a href="#/rol"><i class="fas fa-arrow-left"></i> Volver a selección de rol</a>
        </p>
      </div>
    </section>
  `;

  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isProfessional) {
      const code = document.getElementById('login-code').value;
      if (loginAsProfessional(code)) {
        window.location.hash = '/professional';
      } else {
        showError(t('invalidCode'));
      }
    } else {
      const dialCode = document.getElementById('country-select').value;
      const localNumber = document.getElementById('login-phone').value.trim();
      const fullNumber = composeFullNumber(dialCode, localNumber);
      const client = getClientByPhone(fullNumber);
      if (client) {
        loginAsClient(fullNumber);
        window.location.hash = '/client';
      } else {
        showError(t('noClient'));
      }
    }
  });
}