import { renderClientHistory, showModal, showSkeletonCards } from '../ui.mjs';
import { getClientByPhone } from '../storage.mjs';
import { generateShareToken } from '../shareProfile.mjs';
import { buildShareProfileForm } from '../formBuilder.mjs';
import { showError, showSuccess } from '../toast.mjs';
import { t } from '../i18n.mjs';

export async function initClientView(container) {
  container.innerHTML = `
    <section id="client-view" class="view active">
      <h2><i class="fas fa-history"></i> ${t('historyOf')} mis servicios</h2>
      <div id="client-history" class="history-cards"></div>
      <button id="btn-share-profile" class="action-btn"><i class="fas fa-share-alt"></i> ${t('shareProfile')}</button>
    </section>
  `;

  const historyContainer = document.getElementById('client-history');
  showSkeletonCards(historyContainer, 2);   // ← Skeleton mientras carga

  const phone = localStorage.getItem('sr-client-phone');
  if (phone) {
    await renderClientHistory(phone, historyContainer);
  } else {
    showError(t('noClient'));
  }

  document.getElementById('btn-share-profile').addEventListener('click', async () => {
    const client = await getClientByPhone(phone);
    if (!client) {
      showError('Error al obtener tu perfil.');
      return;
    }
    const token = generateShareToken(client.id);
    const shareUrl = `${window.location.origin}${window.location.pathname}?token=${token}`;
    showModal(t('shareProfile'), buildShareProfileForm(shareUrl));
    document.getElementById('btn-copy-link').addEventListener('click', () => {
      const input = document.getElementById('share-link');
      input.select();
      navigator.clipboard.writeText(input.value).then(() => showSuccess(t('copied')));
    });
  });
}