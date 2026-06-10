import { renderSharedView, showSkeletonCards } from '../ui.mjs';

export async function initSharedView(container, token) {
  showSkeletonCards(container, 2);
  const clientId = validateShareToken(token);
  if (clientId) {
    await renderSharedView(clientId, container);
  } else {
    container.innerHTML = `
      <section class="view active">
        <div class="card" style="text-align:center; margin-top:2rem;">
          <i class="fas fa-link-slash" style="font-size:2rem; color:var(--danger);"></i>
          <h2>Enlace expirado o inválido</h2>
          <p>Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.</p>
        </div>
      </section>`;
  }
}