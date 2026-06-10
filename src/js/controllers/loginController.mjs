import { loginAsProfessional, loginAsClient } from '../auth.mjs';
import { getClientByPhone } from '../storage.mjs';
import { showError } from '../toast.mjs';
import { t } from '../i18n.mjs';

export function initLoginView(container) {
  // Extraer parámetro role del hash (ej: #/login?role=professional)
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split('?')[1] || '');
  const role = params.get('role');

  if (!role || (role !== 'professional' && role !== 'client')) {
    // Si no hay rol válido, redirigir a selección de rol
    window.location.hash = '/rol';
    return;
  }

  const isProfessional = role === 'professional';

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
            <label>Tu número de teléfono:</label>
            <input type="tel" id="login-phone" placeholder="+541112345678" required autofocus />
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
      const phone = document.getElementById('login-phone').value.trim();
      const client = getClientByPhone(phone);
      if (client) {
        loginAsClient(phone);
        window.location.hash = '/client';
      } else {
        showError(t('noClient'));
      }
    }
  });
}