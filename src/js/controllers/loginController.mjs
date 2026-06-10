import { loginAsProfessional, loginAsClient, getRole } from '../auth.mjs';
import { getClientByPhone } from '../storage.mjs';
import { showError } from '../toast.mjs';
import { navigateTo } from '../router.mjs'; // we will add navigateTo later

export function initLoginView(container) {
  container.innerHTML = `
    <section id="login-section" class="view active">
      <h2>Accede a StyleRecord</h2>
      <div class="login-options">
        <button id="btn-professional-login" class="login-btn"><i class="fas fa-cut"></i> Soy Profesional</button>
        <button id="btn-client-login" class="login-btn"><i class="fas fa-user"></i> Soy Cliente</button>
      </div>
      <div id="login-form-container" class="hidden"></div>
    </section>
  `;

  document.getElementById('btn-professional-login').addEventListener('click', () => {
    const formContainer = document.getElementById('login-form-container');
    formContainer.classList.remove('hidden');
    formContainer.innerHTML = `
      <form id="prof-login-form">
        <label>Código de acceso:</label>
        <input type="password" id="prof-code" placeholder="Código" required />
        <button type="submit">Ingresar</button>
      </form>
    `;
    document.getElementById('prof-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('prof-code').value;
      if (loginAsProfessional(code)) {
        navigateTo('/professional');
      } else {
        showError('Código incorrecto. Prueba con 1234');
      }
    });
  });

  document.getElementById('btn-client-login').addEventListener('click', () => {
    const formContainer = document.getElementById('login-form-container');
    formContainer.classList.remove('hidden');
    formContainer.innerHTML = `
      <form id="client-login-form">
        <label>Tu número de teléfono:</label>
        <input type="tel" id="client-phone" placeholder="+541112345678" required />
        <button type="submit">Ver historial</button>
      </form>
    `;
    document.getElementById('client-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('client-phone').value.trim();
      const client = getClientByPhone(phone);
      if (client) {
        loginAsClient(phone);
        navigateTo('/client');
      } else {
        showError('No se encontró un cliente con ese número.');
      }
    });
  });
}
