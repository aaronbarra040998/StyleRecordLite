import { t } from "../i18n.mjs";

export function initRoleView(container) {
  container.innerHTML = `
    <section class="role-selection">
      <!-- Header con animación -->
      <div class="role-header">
        <div class="role-brand">
          <span class="material-symbols-outlined">spa</span>
          <h1>StyleRecord</h1>
        </div>
        <h2 class="role-heading">${t('login')}</h2>
        <p class="role-subtitle">Elige cómo quieres acceder</p>
      </div>

      <!-- Tarjetas de rol -->
      <div class="role-cards">
        <!-- Profesional -->
        <button class="role-card" id="role-professional" aria-label="${t('professional')}">
          <div class="role-icon professional">
            <span class="material-symbols-outlined" style="font-size:36px;">content_cut</span>
          </div>
          <div class="role-info">
            <h2 class="role-card-title professional">${t('professional')}</h2>
            <p class="role-card-desc">Gestiona tus clientes, guarda historiales visuales y optimiza tu agenda.</p>
          </div>
          <span class="material-symbols-outlined role-chevron">chevron_right</span>
        </button>

        <!-- Cliente -->
        <button class="role-card" id="role-client" aria-label="${t('client')}">
          <div class="role-icon client">
            <span class="material-symbols-outlined" style="font-size:36px;">group</span>
          </div>
          <div class="role-info">
            <h2 class="role-card-title client">${t('client')}</h2>
            <p class="role-card-desc">Consulta el historial de tus servicios, reserva citas y comparte tu perfil.</p>
          </div>
          <span class="material-symbols-outlined role-chevron">chevron_right</span>
        </button>
      </div>

      <!-- Enlace de registro -->
      <a class="role-register-link" href="#/register">
        ¿No tienes cuenta? Regístrate ahora
      </a>

      <!-- Badge de seguridad -->
      <div class="role-security-badge">
        <span class="material-symbols-outlined">lock</span>
        <span>Acceso seguro con cifrado SSL</span>
      </div>

      <!-- Imagen decorativa (solo móvil) -->
      <div class="role-decorative-image">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
             alt="Ambiente de salón de belleza" 
             loading="lazy" />
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

  // Accesibilidad: permitir Enter/Space en las tarjetas
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}