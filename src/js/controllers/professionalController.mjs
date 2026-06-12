import { loadClients, addClient, updateClient, deleteClient, getClientById } from '../storage.mjs';
import { addService, getServicesByClientId, updateService, deleteService } from '../serviceManager.mjs';
import { validatePhone } from '../numverifyService.mjs';
import { getBeforeAfterPlaceholders } from '../loremPicsum.mjs';
import { buildEditClientForm, buildNewServiceForm, buildEditServiceForm } from '../formBuilder.mjs';
import { validateClientFormData, validateServiceFormData } from '../validators.mjs';
import { showError, showSuccess, showToast } from '../toast.mjs';
import { escapeHtml, debounce } from '../utils.mjs';
import { selectedClientId, setSelectedClientId } from '../state.mjs';
import { showModal, hideModal, showConfirmModal } from '../ui.mjs';
import { logout } from '../auth.mjs';
import { t } from '../i18n.mjs';
import countries, { composeFullNumber } from '../countries.mjs';

let refreshSidebarFn;
let currentSidebarFilter = 'all'; // 'all' o 'withServices'

export async function initProfessionalView(main) {
  document.body.classList.add('dashboard-mode');

  main.innerHTML = `
    <!-- Sidebar -->
    <aside class="dashboard-sidebar" id="dashboard-sidebar">
      <div class="sidebar-brand">
        <h1 class="sidebar-logo">StyleRecord Lite</h1>
        <p class="sidebar-subtitle">Gestión de Belleza</p>
      </div>

      <button class="btn-new-client" id="btn-new-client">
        <span class="material-symbols-outlined">person_add</span>
        Nuevo Cliente
      </button>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Dashboard</div>
        <a class="sidebar-nav-item active" href="#" data-filter="all" id="nav-clientes">
          <span class="material-symbols-outlined">group</span>
          <span>Clientes</span>
        </a>
        <a class="sidebar-nav-item" href="#" data-filter="withServices" id="nav-servicios">
          <span class="material-symbols-outlined">content_cut</span>
          <span>Servicios</span>
        </a>

        <div class="sidebar-section-label">Clientes Recientes</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">
            <span class="material-symbols-outlined">person</span>
          </div>
          <span class="sidebar-user-name">Staff #04</span>
        </div>
        <button class="sidebar-logout" id="btn-logout-dash" title="Cerrar sesión">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="dashboard-main">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="dashboard-search">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="dashboard-search" placeholder="Buscar cliente..." />
        </div>
        <div class="dashboard-header-actions">
          <button class="header-icon-btn" id="btn-notifications" aria-label="Notificaciones">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="header-icon-btn" id="btn-settings" aria-label="Configuración">
            <span class="material-symbols-outlined">settings</span>
          </button>
          <div class="header-avatar" id="header-avatar">
            <span class="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div id="main-content-area" class="main-content-area"></div>
    </div>

    <!-- FAB -->
    <button class="fab" id="fab-add-service" title="Agregar servicio" style="display:none;">
      <span class="material-symbols-outlined">add</span>
    </button>
  `;

  // Logout
  document.getElementById('btn-logout-dash').addEventListener('click', () => {
    document.body.classList.remove('dashboard-mode');
    logout();
    window.location.hash = '/home';
    window.location.reload();
  });

  // --- Navegación lateral (Clientes / Servicios) ---
  const navClientes = document.getElementById('nav-clientes');
  const navServicios = document.getElementById('nav-servicios');

  function setActiveNav(filter) {
    navClientes.classList.toggle('active', filter === 'all');
    navServicios.classList.toggle('active', filter === 'withServices');
  }

  navClientes.addEventListener('click', (e) => {
    e.preventDefault();
    currentSidebarFilter = 'all';
    setActiveNav('all');
    refreshSidebarFn(document.getElementById('dashboard-search').value);
  });

  navServicios.addEventListener('click', (e) => {
    e.preventDefault();
    currentSidebarFilter = 'withServices';
    setActiveNav('withServices');
    refreshSidebarFn(document.getElementById('dashboard-search').value);
  });

  // --- Icono de Configuración ---
  document.getElementById('btn-settings').addEventListener('click', () => {
    showToast('Configuración próximamente', 'info');
  });

  // --- Notificaciones (placeholder) ---
  document.getElementById('btn-notifications').addEventListener('click', () => {
    showToast('No hay notificaciones nuevas', 'info');
  });

  // Cargar clientes iniciales
  const clients = await loadClients();
  const sidebarList = document.getElementById('sidebar-client-list');
  const mainContent = document.getElementById('main-content-area');

  // Refrescar sidebar aplicando filtro
  refreshSidebarFn = async (filterText = '') => {
    const allClients = await loadClients();
    let filtered = filterText
      ? allClients.filter(c => c.name.toLowerCase().includes(filterText.toLowerCase()) || c.phone.includes(filterText))
      : allClients;

    // Aplicar filtro "Servicios" (clientes con al menos un servicio)
    if (currentSidebarFilter === 'withServices') {
      filtered = filtered.filter(c => c.services && c.services.length > 0);
    }

    renderSidebarClients(sidebarList, filtered);
  };

  renderSidebarClients(sidebarList, clients);

  // Eventos en la lista de clientes
  sidebarList.addEventListener('click', async (e) => {
    const item = e.target.closest('.sidebar-client-item');
    if (!item) return;
    const clientId = item.dataset.id;
    setSelectedClientId(clientId);
    document.querySelectorAll('.sidebar-client-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    await loadClientHistory(clientId, mainContent);
  });

  // Nuevo cliente
  document.getElementById('btn-new-client').addEventListener('click', () => openNewClientModal());

  // Búsqueda
  const searchInput = document.getElementById('dashboard-search');
  searchInput.addEventListener('input', debounce(async (e) => {
    await refreshSidebarFn(e.target.value);
  }, 300));

  // FAB
  document.getElementById('fab-add-service').addEventListener('click', () => {
    if (selectedClientId) {
      openNewServiceModal();
    }
  });

  // Estado inicial
  mainContent.innerHTML = `
    <div class="empty-dashboard">
      <span class="material-symbols-outlined">content_cut</span>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `;
}

// ─── Renderizado de la lista de clientes en el sidebar ───
function renderSidebarClients(container, clients) {
  if (clients.length === 0) {
    container.innerHTML = `<p class="sidebar-empty">Sin clientes</p>`;
    return;
  }
  const html = clients.map(c => {
    const initials = c.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    const lastService = c.services?.length
      ? c.services.reduce((latest, s) => new Date(s.date) > new Date(latest.date) ? s : latest)
      : null;
    const timeAgo = lastService ? formatTimeAgo(lastService.date) : 'Sin servicios';
    return `
      <button class="sidebar-client-item" data-id="${escapeHtml(c.id)}">
        <div class="client-avatar-circle">${initials}</div>
        <div class="client-item-info">
          <p class="client-item-name">${escapeHtml(c.name)}</p>
          <p class="client-item-time">${timeAgo}</p>
        </div>
      </button>
    `;
  }).join('');
  container.innerHTML = html;
}

// ─── Carga del historial de un cliente en el área principal ───
async function loadClientHistory(clientId, container) {
  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = `<p>Cliente no encontrado.</p>`;
    return;
  }
  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const initials = client.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);

  container.innerHTML = `
    <!-- Client Header -->
    <div class="client-detail-header">
      <div class="client-detail-avatar">${initials}</div>
      <div class="client-detail-info">
        <div class="client-detail-name-row">
          <h2 class="client-detail-name">${escapeHtml(client.name)}</h2>
          ${client.services.length > 10 ? '<span class="badge-vip">VIP</span>' : ''}
        </div>
        <div class="client-detail-meta">
          <span class="meta-item">
            <span class="material-symbols-outlined">call</span>
            ${escapeHtml(client.phone)}
          </span>
          <span class="meta-item">
            <span class="material-symbols-outlined">history</span>
            ${services.length} servicios realizados
          </span>
        </div>
      </div>
      <div class="client-detail-actions">
        <button class="btn-toggle-services" id="btn-toggle-services">
          <span class="material-symbols-outlined">visibility_off</span>
          <span>Ocultar servicios</span>
        </button>
        <button class="btn-edit-profile" id="btn-edit-profile">
          <span class="material-symbols-outlined">edit</span>
          Editar Perfil
        </button>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="services-grid" id="services-grid">
      ${sorted.length === 0 ? `
        <div class="empty-services">
          <span class="material-symbols-outlined">content_cut</span>
          <p>No hay servicios registrados</p>
        </div>
      ` : sorted.map(s => renderServiceCardDashboard(s)).join('')}
      
      <button class="add-service-card-dash" id="add-service-area">
        <div class="add-service-icon">
          <span class="material-symbols-outlined">add</span>
        </div>
        <div class="add-service-text">
          <h3>Agregar nuevo servicio</h3>
          <p>Registra un nuevo procedimiento para este cliente</p>
        </div>
      </button>
    </div>

    <footer class="dashboard-footer">
      <p>© 2026 StyleRecord Lite - Gestión Profesional de Belleza</p>
    </footer>
  `;

  // Mostrar FAB
  document.getElementById('fab-add-service').style.display = 'flex';

  // Toggle servicios
  const toggleBtn = document.getElementById('btn-toggle-services');
  const servicesGrid = document.getElementById('services-grid');
  let servicesVisible = true;
  toggleBtn.addEventListener('click', () => {
    servicesVisible = !servicesVisible;
    servicesGrid.style.display = servicesVisible ? '' : 'none';
    toggleBtn.querySelector('span:last-child').textContent = servicesVisible ? 'Ocultar servicios' : 'Mostrar servicios';
    toggleBtn.querySelector('.material-symbols-outlined').textContent = servicesVisible ? 'visibility_off' : 'visibility';
  });

  // Editar perfil
  document.getElementById('btn-edit-profile').addEventListener('click', () => openEditClientModal(client));

  // Agregar servicio
  document.getElementById('add-service-area').addEventListener('click', () => openNewServiceModal());

  // Eventos en tarjetas de servicio
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

// ─── Renderizado de una tarjeta de servicio ───
function renderServiceCardDashboard(service) {
  const images = [];
  if (service.beforeImg) images.push(service.beforeImg);
  if (service.afterImg) images.push(service.afterImg);
  if (service.afterLateralImg) images.push(service.afterLateralImg);
  const imagesJson = escapeHtml(JSON.stringify(images));
  const beforeIdx = images.indexOf(service.beforeImg);
  const afterIdx = images.indexOf(service.afterImg);
  const lateralIdx = images.indexOf(service.afterLateralImg);

  const dateObj = new Date(service.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('es-ES', { month: 'short' });
  const year = dateObj.getFullYear();

  return `
    <div class="service-card-dashboard" data-service-id="${escapeHtml(service.id)}">
      <div class="service-card-header">
        <div class="service-date-badge">
          <span class="service-day">${day}</span>
          <span class="service-month-year">${month} ${year}</span>
        </div>
        <div class="service-info">
          <span class="service-type-pill">${escapeHtml(service.type)}</span>
          <p class="service-stylist">Realizado por: Staff</p>
        </div>
        <div class="service-card-actions">
          <button class="btn-icon-service btn-edit-service-dash" data-id="${escapeHtml(service.id)}" title="Editar">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn-icon-service btn-delete-service-dash" data-id="${escapeHtml(service.id)}" title="Eliminar">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <div class="service-card-body">
        <div class="service-images-grid" data-images='${imagesJson}'>
          <div class="image-card image-item" data-index="${beforeIdx >= 0 ? beforeIdx : 0}">
            ${service.beforeImg 
              ? `<img src="${escapeHtml(service.beforeImg)}" alt="Antes" loading="lazy" />`
              : '<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>'}
            <span class="image-label">ANTES</span>
          </div>
          <div class="image-card image-item" data-index="${afterIdx >= 0 ? afterIdx : 0}">
            ${service.afterImg 
              ? `<img src="${escapeHtml(service.afterImg)}" alt="Después frontal" loading="lazy" />`
              : '<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>'}
            <span class="image-label">DESPUÉS FRONTAL</span>
          </div>
          <div class="image-card image-item" data-index="${lateralIdx >= 0 ? lateralIdx : 0}">
            ${service.afterLateralImg 
              ? `<img src="${escapeHtml(service.afterLateralImg)}" alt="Después lateral" loading="lazy" />`
              : '<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>'}
            <span class="image-label">DESPUÉS LATERAL</span>
          </div>
        </div>
        ${service.notes ? `
        <div class="service-notes">
          <h4 class="service-notes-title">Notas del Servicio</h4>
          <p>${escapeHtml(service.notes)}</p>
        </div>` : ''}
      </div>
    </div>
  `;
}

// ─── Formateo de tiempo relativo ───
function formatTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `Hace ${diffMins} minutos`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Hace ${diffHours} horas`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return date.toLocaleDateString('es-ES');
}

// ─── Modal: Nuevo Cliente ───
async function openNewClientModal() {
  const countryOptions = countries
    .map(c => `<option value="${c.dialCode}" ${c.code === 'PE' ? 'selected' : ''}>${c.flag} ${c.name} (${c.dialCode})</option>`)
    .join('');

  const formHtml = `
    <form id="new-client-form">
      <label>Nombre completo:</label>
      <input type="text" id="client-name" placeholder="María García" required />
      <div class="field-error" id="error-client-name"></div>
      <label>País:</label>
      <select id="client-country" required style="width:100%; margin-bottom:0.8rem;">
        ${countryOptions}
      </select>
      <label>Número de teléfono (sin prefijo):</label>
      <input type="tel" id="client-phone" placeholder="987654321" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validar y Guardar</button>
    </form>
  `;

  showModal('Nuevo Cliente', formHtml);
  const form = document.getElementById('new-client-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('client-name').value.trim();
    const dialCode = document.getElementById('client-country').value;
    const localNumber = document.getElementById('client-phone').value.trim();
    const fullPhone = composeFullNumber(dialCode, localNumber);
    const errors = validateClientFormData(name, fullPhone);
    displayFormErrors('client', errors);
    if (Object.keys(errors).length > 0) return;

    const btn = document.getElementById('validate-btn');
    const validationArea = document.getElementById('validation-area');
    const existing = (await loadClients()).find(c => c.phone === fullPhone);
    if (existing) {
      validationArea.innerHTML = `<div class="validation-error">El teléfono ya está registrado.</div>`;
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Validando...';
    validationArea.innerHTML = '';

    try {
      const result = await validatePhone(fullPhone);
      validationArea.innerHTML = `
        <div class="validation-result">
          <span class="material-symbols-outlined" style="color:green;">check_circle</span> Número válido<br>
          <strong>${escapeHtml(result.number)}</strong><br>
          País: ${escapeHtml(result.country_name)} (${escapeHtml(result.country_code)})<br>
          Compañía: ${escapeHtml(result.carrier)}
        </div>`;
      const newClient = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        name,
        phone: fullPhone,
        phoneValid: true,
        phoneDetails: { country: result.country_name, carrier: result.carrier, line_type: result.line_type },
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
            name,
            phone: fullPhone,
            phoneValid: false,
            phoneDetails: null,
            services: [],
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

// ─── Modal: Editar Cliente ───
async function openEditClientModal(client) {
  const formHtml = buildEditClientForm(client);
  showModal('Editar Cliente', formHtml);
  document.getElementById('edit-client-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('edit-client-name').value.trim();
    const phone = document.getElementById('edit-client-phone').value.trim();
    const errors = validateClientFormData(name, phone);
    displayFormErrors('edit-client', errors);
    if (Object.keys(errors).length > 0) return;
    await updateClient(client.id, { name, phone });
    hideModal();
    await refreshSidebarFn();
    const mainContent = document.getElementById('main-content-area');
    if (selectedClientId === client.id) {
      await loadClientHistory(client.id, mainContent);
    }
    showSuccess('Cliente actualizado');
  });
}

// ─── Modal: Nuevo Servicio ───
async function openNewServiceModal() {
  if (!selectedClientId) {
    showError('Selecciona un cliente primero.');
    return;
  }
  const placeholders = getBeforeAfterPlaceholders();
  showModal('Agregar Servicio', buildNewServiceForm(placeholders.beforeImg, placeholders.afterImg, placeholders.afterLateralImg));
  const form = document.getElementById('new-service-form');
  let currentBefore = placeholders.beforeImg;
  let currentAfter = placeholders.afterImg;
  let currentLateral = placeholders.afterLateralImg;

  document.getElementById('btn-regenerate-images').addEventListener('click', () => {
    const newImgs = getBeforeAfterPlaceholders();
    currentBefore = newImgs.beforeImg;
    currentAfter = newImgs.afterImg;
    currentLateral = newImgs.afterLateralImg;
    document.getElementById('preview-before').src = currentBefore;
    document.getElementById('preview-after-frontal').src = currentAfter;
    document.getElementById('preview-after-lateral').src = currentLateral;
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
      afterLateralImg: currentLateral,
    };
    await addService(selectedClientId, service);
    hideModal();
    const mainContent = document.getElementById('main-content-area');
    await loadClientHistory(selectedClientId, mainContent);
    showSuccess('Servicio agregado');
  });
}

// ─── Editar Servicio ───
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

// ─── Eliminar Servicio ───
async function handleDeleteService(serviceId) {
  const confirmed = await showConfirmModal('¿Eliminar este servicio?');
  if (!confirmed) return;
  await deleteService(selectedClientId, serviceId);
  const mainContent = document.getElementById('main-content-area');
  await loadClientHistory(selectedClientId, mainContent);
  showSuccess('Servicio eliminado');
}

// ─── Mostrar errores en formularios ───
function displayFormErrors(prefix, errors) {
  const fields = ['name', 'phone', 'type', 'date'];
  fields.forEach(f => {
    const el = document.getElementById(`error-${prefix}-${f}`);
    if (el) el.textContent = errors[f] || '';
  });
}