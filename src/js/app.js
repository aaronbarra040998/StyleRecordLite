import { loadHeaderFooter } from "./utils.mjs";
import { isAuthenticated, getRole, logout } from "./auth.mjs";
import { cleanExpiredTokens } from "./shareProfile.mjs";
import { createRouter } from "./router.mjs";
import { initHomeView } from "./controllers/homeController.mjs";
import { initRoleView } from "./controllers/roleController.mjs";
import { initLoginView } from "./controllers/loginController.mjs";
import { initProfessionalView } from "./controllers/professionalController.mjs";
import { initClientView } from "./controllers/clientController.mjs";
import { initSharedView } from "./controllers/sharedController.mjs";
import { initRegisterView } from "./controllers/registerController.mjs"; // Fase 7
import { hideModal, initLightboxDelegation } from "./ui.mjs";
import { t } from "./i18n.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  cleanExpiredTokens();
  initLightboxDelegation(); // Fase 5: lightbox global

  // ========================================================
  // Offline banner
  // ========================================================
  const offlineBanner = document.createElement('div');
  offlineBanner.id = 'offline-banner';
  offlineBanner.className = 'offline-banner hidden';
  offlineBanner.innerHTML = `<i class="fas fa-wifi-slash"></i> ${t('offline')}`;
  document.body.appendChild(offlineBanner);

  window.addEventListener('online', () => offlineBanner.classList.add('hidden'));
  window.addEventListener('offline', () => offlineBanner.classList.remove('hidden'));

  // ========================================================
  // Configuración del modal
  // ========================================================
  const modalClose = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalClose) modalClose.addEventListener("click", hideModal);
  if (modalOverlay) modalOverlay.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) hideModal();
  });

  // Botón de logout genérico (header público)
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      logout();
      window.location.hash = '/home';
      window.location.reload();
    });
  }

  // ========================================================
  // Detección de enlace compartido
  // ========================================================
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  if (token) {
    document.body.classList.remove('dashboard-mode');
    const main = document.querySelector("main");
    main.innerHTML = '';
    await initSharedView(main, token);

    // Permitir navegación desde la vista compartida hacia el SPA
    window.addEventListener('hashchange', () => {
      window.location.href = window.location.origin + window.location.pathname + window.location.hash;
    });

    return;
  }

  // ========================================================
  // Router
  // ========================================================
  const router = createRouter();
  const main = document.querySelector("main");

  // Público: Home
  router.addRoute('/home', () => {
    document.body.classList.remove('dashboard-mode');
    if (btnLogout) btnLogout.style.display = 'none';
    initHomeView(main);
  });

  // Público: Selección de rol
  router.addRoute('/rol', () => {
    document.body.classList.remove('dashboard-mode');
    if (btnLogout) btnLogout.style.display = 'none';
    initRoleView(main);
  });

  // Público: Login (con parámetro ?role=...)
  router.addRoute('/login', () => {
    document.body.classList.remove('dashboard-mode');
    if (btnLogout) btnLogout.style.display = 'none';
    initLoginView(main);
  });

  // Público: Registro profesional (Fase 7)
  router.addRoute('/register', () => {
    document.body.classList.remove('dashboard-mode');
    if (btnLogout) btnLogout.style.display = 'none';
    initRegisterView(main);
  });

  // Protegido: Panel profesional
  router.addRoute('/professional', async () => {
    if (!isAuthenticated() || getRole() !== 'professional') {
      router.navigate('/login?role=professional');
      return;
    }
    await initProfessionalView(main);
  });

  // Protegido: Panel cliente
  router.addRoute('/client', async () => {
    document.body.classList.remove('dashboard-mode');
    if (!isAuthenticated() || getRole() !== 'client') {
      router.navigate('/login?role=client');
      return;
    }
    if (btnLogout) btnLogout.style.display = 'block';
    await initClientView(main);
  });

  // Ruta no encontrada → home
  router.addRoute('*', () => router.navigate('/home'));

  router.start();
});

export function navigateTo(hash) {
  window.location.hash = hash;
}