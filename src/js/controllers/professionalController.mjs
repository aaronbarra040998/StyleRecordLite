import { loadClients, addClient, updateClient, deleteClient, getClientById } from '../storage.mjs';
import { addService, getServicesByClientId, updateService, deleteService } from '../serviceManager.mjs';
import { validatePhone } from '../numverifyService.mjs';
import { getBeforeAfterPlaceholders } from '../loremPicsum.mjs';
import { buildNewClientForm, buildEditClientForm, buildNewServiceForm, buildEditServiceForm } from '../formBuilder.mjs';
import { validateClientFormData, validateServiceFormData } from '../validators.mjs';
import { showError, showSuccess } from '../toast.mjs';
import { escapeHtml, debounce } from '../utils.mjs';
import { selectedClientId, setSelectedClientId } from '../state.mjs';
import { showModal, hideModal, showConfirmModal } from '../ui.mjs';
import { logout } from '../auth.mjs';   // ← AÑADIDO

// Referencia para refrescar lista del sidebar
let refreshSidebarFn;

export async function initProfessionalView(main) {
  // Ocultar header/footer genéricos
  document.body.classList.add('dashboard-mode');

  // Construir estructura del dashboard
  main.innerHTML = `
    <div class="dashboard">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar" id="dashboard-sidebar">
        <button class="btn-new-client" id="btn-new-client">
          <i class="fas fa-plus"></i> Nuevo Cliente
        </button>
        <div class="recent-clients-title">Clientes Recientes</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </aside>

      <!-- Contenido principal -->
      <section class="dashboard-main">
        <div class="dashboard-header">
          <div class="dashboard-logo">StyleRecord Lite</div>
          <div class="dashboard-search">
            <i class="fas fa-search"></i>
            <input type="text" id="dashboard-search" placeholder="Buscar cliente..." />
          </div>
          <div class="dashboard-actions">
            <i class="fas fa-cog"></i>
            <button id="btn-logout-dash"><i class="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
        <div id="main-content-area" class="main-content-area"></div>
      </section>
    </div>
  `;

  // ── Logout ──────────────────────────────────────────
  document.getElementById('btn-logout-dash').addEventListener('click', () => {
    document.body.classList.remove('dashboard-mode');
    logout();                       // limpia localStorage
    window.location.hash = '/login';
    window.location.reload();
  });

  // Cargar clientes iniciales
  const clients = await loadClients();
  const sidebarList = document.getElementById('sidebar-client-list');
  const mainContent = document.getElementById('main-content-area');

  // Función para refrescar sidebar
  refreshSidebarFn = async (filter = '') => {
    const allClients = await loadClients();
    const filtered = filter
      ? allClients.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.phone.includes(filter))
      : allClients;
    renderSidebarClients(sidebarList, filtered);
  };

  // Renderizar lista en sidebar
  renderSidebarClients(sidebarList, clients);

  // Evento clic en sidebar (seleccionar cliente)
  sidebarList.addEventListener('click', async (e) => {
    const item = e.target.closest('.sidebar-client-item');
    if (!item) return;
    const clientId = item.dataset.id;
    setSelectedClientId(clientId);
    // Marcar como seleccionado
    document.querySelectorAll('.sidebar-client-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    // Cargar historial en área principal
    await loadClientHistory(clientId, mainContent);
  });

  // Botón nuevo cliente
  document.getElementById('btn-new-client').addEventListener('click', () => openNewClientModal());

  // Búsqueda en el header
  const searchInput = document.getElementById('dashboard-search');
  searchInput.addEventListener('input', debounce(async (e) => {
    await refreshSidebarFn(e.target.value);
  }, 300));

  // Si no hay cliente seleccionado, mostrar mensaje de bienvenida
  mainContent.innerHTML = `
    <div class="empty-dashboard">
      <i class="fas fa-cut"></i>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `;
}

// ── Renderizar sidebar con clientes ──
function renderSidebarClients(container, clients) {
  if (clients.length === 0) {
    container.innerHTML = `<p style="color:#999; text-align:center;">Sin clientes</p>`;
    return;
  }
  const html = clients.map(c => {
    const initials = c.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    return `
      <div class="sidebar-client-item" data-id="${escapeHtml(c.id)}">
        <div class="client-initials">${initials}</div>
        <span class="client-name-sidebar">${escapeHtml(c.name)}</span>
      </div>
    `;
  }).join('');
  container.innerHTML = html;
}

// ── Cargar historial de servicios en área principal ──
async function loadClientHistory(clientId, container) {
  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = `<p>Cliente no encontrado.</p>`;
    return;
  }
  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));

  let html = `
    <div class="history-header">
      <div class="history-service-count">${services.length} servicio(s) registrado(s)</div>
      <h2 class="history-title">Historial de Servicio</h2>
      <p class="history-client-name">Cliente: ${escapeHtml(client.name)}</p>
      <div class="history-divider"></div>
    </div>
    <div class="service-cards-container">
  `;

  sorted.forEach(service => {
    html += `
      <div class="service-card-dashboard" data-service-id="${escapeHtml(service.id)}">
        <div class="service-card-header">
          <span class="service-date">${formatDateSpanish(service.date)}</span>
          <span class="service-type-badge">${escapeHtml(service.type)}</span>
        </div>
        <div class="service-images">
          <div class="image-card">
            <div class="image-label">ANTES</div>
            ${service.beforeImg 
              ? `<img src="${escapeHtml(service.beforeImg)}" alt="Antes" />`
              : '<div class="image-placeholder">Sin foto</div>'}
          </div>
          <div class="image-card">
            <div class="image-label">DESPUÉS</div>
            ${service.afterImg 
              ? `<img src="${escapeHtml(service.afterImg)}" alt="Después" />`
              : '<div class="image-placeholder">Sin foto</div>'}
          </div>
        </div>
        ${service.notes ? `
        <div class="service-notes-dashboard">
          <div class="notes-bar"></div>
          <div class="notes-text">${escapeHtml(service.notes)}</div>
        </div>` : ''}
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="btn-edit-service-dash" data-id="${escapeHtml(service.id)}" style="background: none; border: 1px solid #ddd; border-radius: 6px; padding: 4px 12px; cursor:pointer;"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-delete-service-dash" data-id="${escapeHtml(service.id)}" style="background: none; border: 1px solid #E53935; color: #E53935; border-radius: 6px; padding: 4px 12px; cursor:pointer;"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="add-service-area" id="add-service-area">
      <span class="add-service-icon">➕</span>
      <span class="add-service-text">Agregar servicio</span>
    </div>
    </div>
  `;

  container.innerHTML = html;

  // Evento para agregar servicio
  document.getElementById('add-service-area').addEventListener('click', () => openNewServiceModal());

  // Eventos para editar/eliminar servicios (delegación)
  container.querySelectorAll('.btn-edit-service-dash').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleEditService(btn.dataset.id);
    });
  });
  container.querySelectorAll('.btn-delete-service-dash').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleDeleteService(btn.dataset.id);
    });
  });
}

// ── Formato de fecha en español ──
function formatDateSpanish(dateStr) {
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ── CRUD de cliente y servicios (sin cambios, pero se incluyen para completitud) ──

async function openNewClientModal() {
  showModal('Nuevo Cliente', buildNewClientForm());
  const form = document.getElementById('new-client-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const errors = validateClientFormData(name, phone);
    displayFormErrors('client', errors);
    if (Object.keys(errors).length > 0) return;

    const btn = document.getElementById('validate-btn');
    const validationArea = document.getElementById('validation-area');
    const existing = (await loadClients()).find(c => c.phone === phone);
    if (existing) {
      validationArea.innerHTML = `<div class="validation-error">El teléfono ya está registrado.</div>`;
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Validando...';
    validationArea.innerHTML = '';

    try {
      const result = await validatePhone(phone);
      validationArea.innerHTML = `
        <div class="validation-result">
          <i class="fas fa-check-circle"></i> Número válido<br>
          <strong>${escapeHtml(result.number)}</strong><br>
          País: ${escapeHtml(result.country_name)} (${escapeHtml(result.country_code)})<br>
          Compañía: ${escapeHtml(result.carrier)}
        </div>`;
      const newClient = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        name, phone, phoneValid: true,
        phoneDetails: {
          country: result.country_name,
          carrier: result.carrier,
          line_type: result.line_type,
        },
        services: [],
      };
      await addClient(newClient);
      hideModal();
      await refreshSidebarFn();
      showSuccess('Cliente creado correctamente');
    } catch (error) {
      if (error.name === 'InvalidPhoneError') {
        validationArea.innerHTML = `
          <div class="validation-error">El número no es válido.</div>
          <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
          <button type="button" id="force-save-btn">Guardar manualmente</button>`;
        document.getElementById('force-save-btn').addEventListener('click', async () => {
          const newClient = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            name, phone, phoneValid: false, phoneDetails: null, services: [],
          };
          await addClient(newClient);
          hideModal();
          await refreshSidebarFn();
        });
      } else {
        validationArea.innerHTML = `<div class="validation-error">${escapeHtml(error.message)}</div>`;
      }
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Validar y Guardar';
    }
  });
}

async function openNewServiceModal() {
  if (!selectedClientId) {
    showError('Selecciona un cliente primero.');
    return;
  }
  const { before, after } = getBeforeAfterPlaceholders();
  showModal('Agregar Servicio', buildNewServiceForm(before, after));
  const form = document.getElementById('new-service-form');
  let currentBefore = before, currentAfter = after;

  document.getElementById('btn-regenerate-images').addEventListener('click', () => {
    const newImgs = getBeforeAfterPlaceholders();
    currentBefore = newImgs.before;
    currentAfter = newImgs.after;
    document.getElementById('preview-before').src = currentBefore;
    document.getElementById('preview-after').src = currentAfter;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const type = document.getElementById('service-type').value;
    const date = document.getElementById('service-date').value;
    const notes = document.getElementById('service-notes').value.trim();
    const errors = validateServiceFormData(type, date, notes);
    displayFormErrors('service', errors);
    if (Object.keys(errors).length > 0) return;

    const service = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      clientId: selectedClientId,
      date, type, notes,
      beforeImg: currentBefore,
      afterImg: currentAfter,
    };
    await addService(selectedClientId, service);
    hideModal();
    // Refrescar historial
    const mainContent = document.getElementById('main-content-area');
    await loadClientHistory(selectedClientId, mainContent);
    showSuccess('Servicio agregado');
  });
}

async function handleEditService(serviceId) {
  const services = await getServicesByClientId(selectedClientId);
  const service = services.find(s => s.id === serviceId);
  if (!service) return;
  showModal('Editar Servicio', buildEditServiceForm(service));
  document.getElementById('edit-service-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const type = document.getElementById('edit-service-type').value;
    const date = document.getElementById('edit-service-date').value;
    const notes = document.getElementById('edit-service-notes').value.trim();
    const errors = validateServiceFormData(type, date, notes);
    displayFormErrors('edit-service', errors);
    if (Object.keys(errors).length > 0) return;
    await updateService(selectedClientId, serviceId, { type, date, notes });
    hideModal();
    const mainContent = document.getElementById('main-content-area');
    await loadClientHistory(selectedClientId, mainContent);
    showSuccess('Servicio actualizado');
  });
}

async function handleDeleteService(serviceId) {
  const confirmed = await showConfirmModal('¿Eliminar este servicio?');
  if (!confirmed) return;
  await deleteService(selectedClientId, serviceId);
  const mainContent = document.getElementById('main-content-area');
  await loadClientHistory(selectedClientId, mainContent);
  showSuccess('Servicio eliminado');
}

function displayFormErrors(prefix, errors) {
  const fields = ['name', 'phone', 'type', 'date'];
  fields.forEach(f => {
    const el = document.getElementById(`error-${prefix}-${f}`);
    if (el) el.textContent = errors[f] || '';
  });
}