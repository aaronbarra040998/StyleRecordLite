import { renderClientHistory, showModal } from '../ui.mjs';
import { getClientByPhone } from '../storage.mjs';
import { generateShareToken } from '../shareProfile.mjs';
import { buildShareProfileForm } from '../formBuilder.mjs';
import { showError, showSuccess } from '../toast.mjs';

export async function initClientView(container) {
  container.innerHTML = `
    <section id="client-view" class="view active">
      <h2><i class="fas fa-history"></i> Mi Historial de Servicios</h2>
      <div id="client-history" class="history-cards"></div>
      <button id="btn-share-profile" class="action-btn"><i class="fas fa-share-alt"></i> Compartir Perfil</button>
    </section>
  `;

  const phone = localStorage.getItem('sr-client-phone');
  if (phone) {
    await renderClientHistory(phone, document.getElementById('client-history'));
  } else {
    showError('Error al recuperar tu información.');
  }

  document.getElementById('btn-share-profile').addEventListener('click', async () => {
    const client = await getClientByPhone(phone);
    if (!client) {
      showError('Error al obtener tu perfil.');
      return;
    }
    const token = generateShareToken(client.id);
    const shareUrl = `${window.location.origin}${window.location.pathname}?token=${token}`;
    showModal('Compartir Perfil', buildShareProfileForm(shareUrl));
    document.getElementById('btn-copy-link').addEventListener('click', () => {
      const input = document.getElementById('share-link');
      input.select();
      navigator.clipboard.writeText(input.value).then(() => showSuccess('Enlace copiado al portapapeles.'));
    });
  });
}