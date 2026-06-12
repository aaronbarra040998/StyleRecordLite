import { t } from "../i18n.mjs";

export function initRoleView(container) {
  container.innerHTML = `
    <section class="role-selection">
      <h1 class="role-heading">Accede a StyleRecord</h1>
      <p class="role-subtitle">Elige cómo quieres acceder</p>
      <div class="role-cards">
        <!-- Profesional -->
        <div class="role-card" id="role-professional" tabindex="0" role="button" aria-label="Soy Profesional">
          <div class="role-icon professional">
            <span class="material-symbols-outlined" style="font-size:36px;">content_cut</span>
          </div>
          <h2 class="role-card-title professional">${t('professional')}</h2>
          <p class="role-card-desc">Gestiona tus clientes, guarda historiales visuales y optimiza tu agenda.</p>
        </div>
        <!-- Cliente -->
        <div class="role-card" id="role-client" tabindex="0" role="button" aria-label="Soy Cliente">
          <div class="role-icon client">
            <span class="material-symbols-outlined" style="font-size:36px;">group</span>
          </div>
          <h2 class="role-card-title client">${t('client')}</h2>
          <p class="role-card-desc">Consulta el historial de tus servicios, reserva citas y comparte tu perfil.</p>
        </div>
      </div>
      <div class="role-register-link">
        ¿No tienes cuenta? <a href="#/register">Regístrate ahora</a>
      </div>
      <div class="role-security-badge">
        <span class="material-symbols-outlined" style="font-size:18px;">lock</span>
        <span>Acceso seguro con cifrado SSL</span>
      </div>
    </section>
  `;

  // Eventos de navegación
  document.getElementById('role-professional').addEventListener('click', () => {
    window.location.hash = '/login?role=professional';
  });
  document.getElementById('role-client').addEventListener('click', () => {
    window.location.hash = '/login?role=client';
  });

  // También permitir Enter/Space en las tarjetas para accesibilidad
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}