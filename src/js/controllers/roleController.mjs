import { t } from "../i18n.mjs";

export function initRoleView(container) {
  container.innerHTML = `
    <section class="role-selection">
      <h2 class="role-heading">${t('login')}</h2>
      <p class="role-subtitle">Elige cómo quieres acceder</p>
      <div class="role-cards">
        <div class="role-card" id="role-professional">
          <div class="role-icon">
            <i class="fas fa-cut"></i>
          </div>
          <h3 class="role-card-title">${t('professional')}</h3>
          <p class="role-card-desc">Gestiona tus clientes, guarda historiales visuales y haz crecer tu negocio.</p>
        </div>
        <div class="role-card" id="role-client">
          <div class="role-icon">
            <i class="fas fa-user"></i>
          </div>
          <h3 class="role-card-title">${t('client')}</h3>
          <p class="role-card-desc">Consulta el historial de tus servicios y comparte tu perfil con profesionales.</p>
        </div>
      </div>
    </section>
  `;

  document.getElementById('role-professional').addEventListener('click', () => {
    window.location.hash = '/login?role=professional';
  });
  document.getElementById('role-client').addEventListener('click', () => {
    window.location.hash = '/login?role=client';
  });
}