import { loadHeaderFooter } from "./utils.mjs";
import {
  isAuthenticated,
  getRole,
  loginAsProfessional,
  loginAsClient,
  logout,
} from "./auth.mjs";
import {
  renderClientList,
  renderClientHistory,
  renderClientServices,
  showModal,
  hideModal,
} from "./ui.mjs";
import { loadClients, addClient, deleteClient, getClientByPhone } from "./storage.mjs";
import { validatePhone } from "./numverifyService.mjs";
import { addService, deleteService, createServiceTemplate } from "./serviceManager.mjs";
import { getBeforeAfterPlaceholders } from "./loremPicsum.mjs";

let selectedClientId = null;

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // Referencias DOM
  const loginSection = document.getElementById("login-section");
  const professionalView = document.getElementById("professional-view");
  const clientView = document.getElementById("client-view");
  const btnLogout = document.createElement("button");
  btnLogout.id = "btn-logout";
  btnLogout.textContent = "Salir";
  btnLogout.style.display = "none";

  // Agregar botón al header
  const header = document.getElementById("main-header");
  if (header) header.appendChild(btnLogout);

  // Modal cerrar
  document.getElementById("modal-close").addEventListener("click", hideModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) hideModal();
  });

  // Control de vistas
  function showAppView() {
    loginSection.classList.remove("active");
    professionalView.classList.remove("active");
    clientView.classList.remove("active");

    const role = getRole();
    if (role === "professional") {
      professionalView.classList.add("active");
      refreshClientList();
      document.getElementById("service-history").innerHTML = "";
      btnLogout.style.display = "block";
    } else if (role === "client") {
      clientView.classList.add("active");
      const phone = localStorage.getItem("sr-client-phone");
      if (phone) {
        renderClientHistory(phone, document.getElementById("client-history"));
      }
      btnLogout.style.display = "block";
    }
  }

  // Si ya autenticado, mostrar app
  if (isAuthenticated()) {
    loginSection.classList.add("hidden");
    showAppView();
  } else {
    loginSection.classList.remove("hidden");
  }

  // Función auxiliar para refrescar lista de clientes
  function refreshClientList(filter = "") {
    const container = document.getElementById("client-list");
    renderClientList(container, filter);
    attachClientCardEvents();
  }

  // Eventos en tarjetas de clientes (click, eliminar)
  function attachClientCardEvents() {
    document.querySelectorAll(".client-card").forEach(card => {
      card.addEventListener("click", (e) => {
        // Ignorar si se hizo clic en el botón de eliminar
        if (e.target.closest(".btn-delete-client")) return;
        const clientId = card.dataset.id;
        selectedClientId = clientId;
        renderClientServices(clientId, document.getElementById("service-history"));
        // Mostrar botón "Agregar Servicio"
        document.getElementById("btn-add-service").style.display = "block";
      });
    });

    document.querySelectorAll(".btn-delete-client").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const clientId = btn.dataset.id;
        if (confirm("¿Eliminar este cliente y todos sus servicios?")) {
          deleteClient(clientId);
          if (selectedClientId === clientId) {
            selectedClientId = null;
            document.getElementById("service-history").innerHTML = "";
            document.getElementById("btn-add-service").style.display = "none";
          }
          refreshClientList();
        }
      });
    });
  }

  // ----------- LOGIN -----------
  document.getElementById("btn-professional-login").addEventListener("click", () => {
    const container = document.getElementById("login-form-container");
    container.classList.remove("hidden");
    container.innerHTML = `
      <form id="prof-login-form">
        <label>Código de acceso:</label>
        <input type="password" id="prof-code" placeholder="Código" required />
        <button type="submit">Ingresar</button>
      </form>
    `;
    document.getElementById("prof-login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const code = document.getElementById("prof-code").value;
      if (loginAsProfessional(code)) {
        loginSection.classList.add("hidden");
        showAppView();
      } else {
        alert("Código incorrecto. Prueba con 1234");
      }
    });
  });

  document.getElementById("btn-client-login").addEventListener("click", () => {
    const container = document.getElementById("login-form-container");
    container.classList.remove("hidden");
    container.innerHTML = `
      <form id="client-login-form">
        <label>Tu número de teléfono:</label>
        <input type="tel" id="client-phone" placeholder="+541112345678" required />
        <button type="submit">Ver historial</button>
      </form>
    `;
    document.getElementById("client-login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = document.getElementById("client-phone").value.trim();
      const client = getClientByPhone(phone);
      if (client) {
        loginAsClient(phone);
        loginSection.classList.add("hidden");
        showAppView();
      } else {
        alert("No se encontró un cliente con ese número.");
      }
    });
  });

  // ----------- PROFESIONAL: búsqueda de clientes -----------
  const searchInput = document.getElementById("client-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      refreshClientList(e.target.value);
    });
  }

  // ----------- PROFESIONAL: botón "Agregar Servicio" -----------
  document.getElementById("btn-add-service").addEventListener("click", () => {
    if (!selectedClientId) {
      alert("Selecciona un cliente primero.");
      return;
    }
    // Generar placeholders
    const { before, after } = getBeforeAfterPlaceholders();
    showModal("Agregar Servicio", `
      <form id="new-service-form">
        <label>Tipo de servicio:</label>
        <select id="service-type" required>
          <option value="corte">Corte</option>
          <option value="tinte">Tinte</option>
          <option value="tratamiento">Tratamiento</option>
          <option value="peinado">Peinado</option>
          <option value="otros">Otros</option>
        </select>
        <label>Fecha:</label>
        <input type="date" id="service-date" value="${new Date().toISOString().slice(0,10)}" required />
        <label>Notas:</label>
        <textarea id="service-notes" rows="3"></textarea>
        <div class="image-preview">
          <div><small>Antes</small><img src="${before}" id="preview-before" /></div>
          <div><small>Después</small><img src="${after}" id="preview-after" /></div>
        </div>
        <button type="button" id="btn-regenerate-images">Generar otras imágenes</button>
        <button type="submit">Guardar Servicio</button>
      </form>
    `);

    const form = document.getElementById("new-service-form");
    let currentBefore = before;
    let currentAfter = after;

    // Regenerar imágenes
    document.getElementById("btn-regenerate-images").addEventListener("click", () => {
      const newImgs = getBeforeAfterPlaceholders();
      currentBefore = newImgs.before;
      currentAfter = newImgs.after;
      document.getElementById("preview-before").src = currentBefore;
      document.getElementById("preview-after").src = currentAfter;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const type = document.getElementById("service-type").value;
      const date = document.getElementById("service-date").value;
      const notes = document.getElementById("service-notes").value;

      const service = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        clientId: selectedClientId,
        date,
        type,
        notes,
        beforeImg: currentBefore,
        afterImg: currentAfter,
      };

      addService(selectedClientId, service);
      renderClientServices(selectedClientId, document.getElementById("service-history"));
      hideModal();
    });
  });

  // ----------- PROFESIONAL: eventos en servicios (editar/eliminar) -----------
  document.getElementById("service-history").addEventListener("click", (e) => {
    const btnEdit = e.target.closest(".btn-edit-service");
    const btnDelete = e.target.closest(".btn-delete-service");

    if (btnEdit) {
      const serviceId = btnEdit.dataset.id;
      const services = getServicesByClientId(selectedClientId);
      const service = services.find(s => s.id === serviceId);
      if (!service) return;
      // Editar: reutilizamos el modal de agregar, pero precargado
      showModal("Editar Servicio", `
        <form id="edit-service-form">
          <label>Tipo:</label>
          <select id="edit-service-type" required>
            <option value="corte" ${service.type==="corte"?"selected":""}>Corte</option>
            <option value="tinte" ${service.type==="tinte"?"selected":""}>Tinte</option>
            <option value="tratamiento" ${service.type==="tratamiento"?"selected":""}>Tratamiento</option>
            <option value="peinado" ${service.type==="peinado"?"selected":""}>Peinado</option>
            <option value="otros" ${service.type==="otros"?"selected":""}>Otros</option>
          </select>
          <label>Fecha:</label>
          <input type="date" id="edit-service-date" value="${service.date}" required />
          <label>Notas:</label>
          <textarea id="edit-service-notes" rows="3">${service.notes}</textarea>
          <button type="submit">Guardar Cambios</button>
        </form>
      `);
      document.getElementById("edit-service-form").addEventListener("submit", (ev) => {
        ev.preventDefault();
        const updated = {
          type: document.getElementById("edit-service-type").value,
          date: document.getElementById("edit-service-date").value,
          notes: document.getElementById("edit-service-notes").value,
        };
        import("./serviceManager.mjs").then(({ updateService }) => {
          updateService(selectedClientId, serviceId, updated);
          renderClientServices(selectedClientId, document.getElementById("service-history"));
          hideModal();
        });
      });
    }

    if (btnDelete) {
      const serviceId = btnDelete.dataset.id;
      if (confirm("¿Eliminar este servicio?")) {
        deleteService(selectedClientId, serviceId);
        renderClientServices(selectedClientId, document.getElementById("service-history"));
      }
    }
  });

  // ----------- NUEVO CLIENTE (con validación Numverify) -----------
  document.getElementById("btn-new-client").addEventListener("click", () => {
    showModal("Nuevo Cliente", `
      <form id="new-client-form">
        <label>Nombre completo:</label>
        <input type="text" id="client-name" placeholder="María García" required />
        <label>Teléfono (con código de país):</label>
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

      // Verificar duplicado
      const existing = loadClients().find(c => c.phone === phone);
      if (existing) {
        validationArea.innerHTML = `<div class="validation-error">El teléfono ya está registrado.</div>`;
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Validando...';
      validationArea.innerHTML = "";

      try {
        const result = await validatePhone(phone);
        validationArea.innerHTML = `
          <div class="validation-result">
            <i class="fas fa-check-circle"></i> Número válido<br>
            <strong>${result.number}</strong><br>
            País: ${result.country_name} (${result.country_code})<br>
            Compañía: ${result.carrier}<br>
          </div>
        `;

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
        refreshClientList();
        hideModal();
      } catch (error) {
        if (error.name === "InvalidPhoneError") {
          validationArea.innerHTML = `
            <div class="validation-error">El número no es válido.</div>
            <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
            <button type="button" id="force-save-btn">Guardar manualmente</button>
          `;
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
            refreshClientList();
            hideModal();
          });
        } else {
          validationArea.innerHTML = `<div class="validation-error">${error.message}</div>`;
        }
      } finally {
        btn.disabled = false;
        btn.innerHTML = "Validar y Guardar";
      }
    });
  });

  // Logout
  btnLogout.addEventListener("click", () => {
    logout();
    window.location.reload();
  });
});