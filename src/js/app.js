import { loadHeaderFooter } from "./utils.mjs";
import { isAuthenticated, getRole, logout } from "./auth.mjs";
import { cleanExpiredTokens } from "./shareProfile.mjs";
import { createRouter, navigateTo } from "./router.mjs";   // importamos navigateTo desde aquí
import { initLoginView } from "./controllers/loginController.mjs";
import { initProfessionalView } from "./controllers/professionalController.mjs";
import { initClientView } from "./controllers/clientController.mjs";
import { initSharedView } from "./controllers/sharedController.mjs";
import { hideModal } from "./ui.mjs";
import { t } from "./i18n.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  cleanExpiredTokens();

  // Service Worker (solo producción)
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    import('workbox-window').then(({ Workbox }) => {
      const wb = new Workbox(import.meta.env.BASE_URL + 'sw.js');
      wb.addEventListener('waiting', () => {
        if (confirm('Nueva versión disponible. ¿Actualizar ahora?')) {
          wb.messageSkipWaiting();
        }
      });
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });
      wb.register();
    }).catch(err => console.error('Workbox no se pudo cargar:', err));
  }

  // Banner offline
  const offlineBanner = document.createElement('div');
  offlineBanner.id = 'offline-banner';
  offlineBanner.className = 'offline-banner hidden';
  offlineBanner.innerHTML = `<i class="fas fa-wifi-slash"></i> ${t('offline')}`;
  document.body.appendChild(offlineBanner);

  window.addEventListener('online', () => offlineBanner.classList.add('hidden'));
  window.addEventListener('offline', () => offlineBanner.classList.remove('hidden'));

  // Modal
  const modalClose = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalClose) modalClose.addEventListener("click", hideModal);
  if (modalOverlay) modalOverlay.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) hideModal();
  });

  // Logout genérico
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logout();
      navigateTo('/login');
      window.location.reload();
    });
  }

  // Detección de enlace compartido (token en query)
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  if (token) {
    document.body.classList.remove('dashboard-mode');
    const main = document.querySelector("main");
    main.innerHTML = '';
    await initSharedView(main, token);
    return;
  }

  // Router
  const router = createRouter();
  const main = document.querySelector("main");

  router.addRoute('/login', () => {
    document.body.classList.remove('dashboard-mode');
    if (btnLogout) btnLogout.style.display = 'none';
    initLoginView(main);
  });

  router.addRoute('/professional', async () => {
    if (!isAuthenticated() || getRole() !== 'professional') {
      router.navigate('/login');
      return;
    }
    await initProfessionalView(main);
  });

  router.addRoute('/client', async () => {
    document.body.classList.remove('dashboard-mode');
    if (!isAuthenticated() || getRole() !== 'client') {
      router.navigate('/login');
      return;
    }
    if (btnLogout) btnLogout.style.display = 'block';
    await initClientView(main);
  });

  router.addRoute('*', () => router.navigate('/login'));

  // Redirigir si ya está autenticado
  if (isAuthenticated()) {
    const role = getRole();
    if (role === 'professional') {
      router.navigate('/professional');
    } else if (role === 'client') {
      router.navigate('/client');
    } else {
      router.navigate('/login');
    }
  }

  router.start();
});

// ❌ Eliminamos esta exportación duplicada
// export function navigateTo(hash) { window.location.hash = hash; }