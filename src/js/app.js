import { loadHeaderFooter } from "./utils.mjs";
import { isAuthenticated, getRole, loginAsProfessional, loginAsClient, logout } from "./auth.mjs";
import { renderClientList, renderClientHistory, showModal, hideModal } from "./ui.mjs";
import { loadClients, saveClients, addClient, getClientByPhone } from "./storage.mjs";
import { validatePhone } from "./numverifyService.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // Referencias a elementos
  const loginSection = document.getElementById("login-section");
  const professionalView = document.getElementById("professional-view");
  const clientView = document.getElementById("client-view");
  const btnLogout = document.getElementById("btn-logout") || document.createElement("button");

  // Manejo del modal siempre presente
  document.getElementById("modal-close").addEventListener("click", hideModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) hideModal();
  });

  // Función para mostrar la vista correcta
  function showAppView() {
    loginSection.classList.remove("active");
    professionalView.classList.remove("active");
    clientView.classList.remove("active");

    const role = getRole();
    if (role === "professional") {
      professionalView.classList.add("active");
      renderClientList(document.getElementById("client-list"));
    } else if (role === "client") {
      clientView.classList.add("active");
      const phone = localStorage.getItem("sr-client-phone");
      if (phone) {
        renderClientHistory(phone, document.getElementById("client-history"));
      }
    }
    // Mostrar botón salir (lo añadimos al header)
    if (role) {
      btnLogout.style.display = "block";
      btnLogout.textContent = "Salir";
      btnLogout.onclick = () => {
        logout();
        window.location.reload();
      };
      // Aseguramos que esté en el header (si no se cargó desde partial)
      const header = document.getElementById("main-header");
      if (header && !header.contains(btnLogout)) {
        header.appendChild(btnLogout);
      }
    } else {
      btnLogout.style.display = "none";
    }
  }

  // Si ya está autenticado, mostrar la app directamente
  if (isAuthenticated()) {
    loginSection.classList.remove("active");
    showAppView();
  } else {
    loginSection.classList.add("active");
    professionalView.classList.remove("active");
    clientView.classList.remove("active");
  }

  // ---------------------- LOGIN -------------------------
  // Profesional
  document.getElementById("btn-professional-login").addEventListener("click", () => {
    const container = document.getElementById("login-form-container");
    container.classList.remove("hidden");
    container.innerHTML = `
      <form id="prof-login-form">
        <label for="prof-code">Código de acceso:</label>
        <input type="password" id="prof-code" placeholder="Código" required />
        <button type="submit">Ingresar</button>
      </form>
    `;
    document.getElementById("prof-login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const code = document.getElementById("prof-code").value;
      if (loginAsProfessional(code)) {
        loginSection.classList.remove("active");
        showAppView();
      } else {
        alert("Código incorrecto. Prueba con 1234");
      }
    });
  });

  // Cliente
  document.getElementById("btn-client-login").addEventListener("click", () => {
    const container = document.getElementById("login-form-container");
    container.classList.remove("hidden");
    container.innerHTML = `
      <form id="client-login-form">
        <label for="client-phone">Tu número de teléfono (con código de país):</label>
        <input type="tel" id="client-phone" placeholder="+54 11 1234-5678" required />
        <button type="submit">Ver historial</button>
      </form>
    `;
    document.getElementById("client-login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = document.getElementById("client-phone").value.trim();
      const client = getClientByPhone(phone);
      if (client) {
        loginAsClient(phone);
        loginSection.classList.remove("active");
        showAppView();
      } else {
        alert("No se encontró un cliente con ese número. Pide a tu profesional que te registre.");
      }
    });
  });

  // -------------------- PROFESIONAL: Nuevo cliente con Numverify ---------------
  document.getElementById("btn-new-client").addEventListener("click", () => {
    showModal("Nuevo Cliente", `
      <form id="new-client-form">
        <label for="client-name">Nombre completo:</label>
        <input type="text" id="client-name" placeholder="María García" required />
        <label for="client-phone">Teléfono (con código de país):</label>
        <input type="tel" id="client-phone" placeholder="+5491112345678" required />
        <div id="validation-area"></div>
        <button type="submit" id="validate-btn">Validar y Guardar</button>
      </form>
    `);

    const form = document.getElementById("new-client-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("client-name").value.trim();
      const phone = document.getElementById("client-phone").value.trim();
      const btn = document.getElementById("validate-btn");
      const validationArea = document.getElementById("validation-area");

      // Mostrar spinner
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Validando...';
      validationArea.innerHTML = "";

      try {
        const result = await validatePhone(phone);

        // Éxito: mostrar resultado
        validationArea.innerHTML = `
          <div class="validation-result">
            <i class="fas fa-check-circle"></i> Número válido<br>
            <strong>${result.number}</strong><br>
            País: ${result.country_name} (${result.country_code})<br>
            Compañía: ${result.carrier}<br>
            Tipo: ${result.line_type}
          </div>
        `;

        // Crear cliente
        const newClient = {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          name,
          phone,
          phoneValid: true,
          phoneDetails: {
            country: result.country_name,
            carrier: result.carrier,
            line_type: result.line_type,
          },
          services: [],
        };

        addClient(newClient);
        renderClientList(document.getElementById("client-list"));
        hideModal();
      } catch (error) {
        // Error en validación
        let errorMsg = "";
        if (error.name === "InvalidPhoneError") {
          errorMsg = `
            <div class="validation-result validation-error">
              <i class="fas fa-times-circle"></i> El número no es válido.<br>
              <small>${error.message}</small>
            </div>
          `;
          // Permitir guardar manualmente
          errorMsg += `
            <label>
              <input type="checkbox" id="manual-save"> Guardar de todas formas (sin validar)
            </label>
            <button type="button" id="force-save-btn">Guardar manualmente</button>
          `;
          validationArea.innerHTML = errorMsg;

          document.getElementById("force-save-btn").addEventListener("click", () => {
            const newClient = {
              id: Date.now().toString(36) + Math.random().toString(36).substr(2),
              name,
              phone,
              phoneValid: false,
              phoneDetails: null,
              services: [],
            };
            addClient(newClient);
            renderClientList(document.getElementById("client-list"));
            hideModal();
          });
        } else {
          validationArea.innerHTML = `
            <div class="validation-result validation-error">
              <i class="fas fa-exclamation-triangle"></i> ${error.message}
            </div>
          `;
        }
      } finally {
        btn.disabled = false;
        btn.innerHTML = "Validar y Guardar";
      }
    });
  });
});