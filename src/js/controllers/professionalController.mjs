import { loadClients, addClient, updateClient, deleteClient, getClientById } from '../storage.mjs';
import { addService, getServicesByClientId, updateService, deleteService } from '../serviceManager.mjs';
import { validatePhone } from '../numverifyService.mjs';
import { getBeforeAfterPlaceholders } from '../loremPicsum.mjs';
import { buildNewClientForm, buildEditClientForm, buildNewServiceForm, buildEditServiceForm } from '../formBuilder.mjs';
import { validateClientFormData, validateServiceFormData } from '../validators.mjs';
import { showError, showSuccess } from '../toast.mjs';
import { escapeHtml, debounce } from '../utils.mjs';
import { selectedClientId, setSelectedClientId } from '../state.mjs';
import { showModal, hideModal, showConfirmModal, showSkeletonCards } from '../ui.mjs';
import { logout } from '../auth.mjs';
import { t } from '../i18n.mjs';

let refreshSidebarFn;

export async function initProfessionalView(main) {
  document.body.classList.add('dashboard-mode');

  main.innerHTML = `
    <div class="dashboard">
      <aside class="dashboard-sidebar" id="dashboard-sidebar">
        <button class="btn-new-client" id="btn-new-client">
          <i class="fas fa-plus"></i> Nuevo Cliente
        </button>
        <div class="recent-clients-title">Clientes Recientes</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </aside>

      <section class="dashboard-main">
        <div class="dashboard-header">
          <div class="dashboard-logo">StyleRecord Lite</div>
          <div class="dashboard-search">
            <i class="fas fa-search"></i>
            <input type="text" id="dashboard-search" placeholder="Buscar cliente..." />
          </div>
          <div class="dashboard-actions">
            <div class="profile-menu-container">
              <button class="profile-menu-trigger" id="profile-menu-trigger" aria-label="Menú de perfil">
                <i class="fas fa-cog"></i>
              </button>
              <div class="profile-dropdown hidden" id="profile-dropdown">
                <div class="profile-info">
                  <span class="profile-name">Profesional</span>
                  <span class="profile-role">Administrador</span>
                </div>
                <a href="#/configuracion" class="profile-link" style="display:none;"><i class="fas fa-sliders-h"></i> Configuración</a>
                <button id="btn-logout-dash" class="profile-link"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
        <div id="main-content-area" class="main-content-area"></div>
      </section>
    </div>
  `;

  // Menú de perfil desplegable
  const trigger = document.getElementById('profile-menu-trigger');
  const dropdown = document.getElementById('profile-dropdown');
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', () => {
    if (!dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });
  dropdown.addEventListener('click', (e) => e.stopPropagation());

  document.getElementById('btn-logout-dash').addEventListener('click', () => {
    document.body.classList.remove('dashboard-mode');
    logout();
    window.location.hash = '/home';
    window.location.reload();
  });

  const clients = await loadClients();
  const sidebarList = document.getElementById('sidebar-client-list');
  const mainContent = document.getElementById('main-content-area');

  refreshSidebarFn = async (filter = '') => {
    const allClients = await loadClients();
    const filtered = filter
      ? allClients.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.phone.includes(filter))
      : allClients;
    renderSidebarClients(sidebarList, filtered);
  };

  renderSidebarClients(sidebarList, clients);

  sidebarList.addEventListener('click', async (e) => {
    const item = e.target.closest('.sidebar-client-item');
    if (!item) return;
    const clientId = item.dataset.id;
    setSelectedClientId(clientId);
    document.querySelectorAll('.sidebar-client-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    await loadClientHistory(clientId, mainContent);
  });

  document.getElementById('btn-new-client').addEventListener('click', () => openNewClientModal());

  const searchInput = document.getElementById('dashboard-search');
  searchInput.addEventListener('input', debounce(async (e) => {
    await refreshSidebarFn(e.target.value);
  }, 300));

  mainContent.innerHTML = `
    <div class="empty-dashboard">
      <i class="fas fa-cut"></i>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `;
}

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
        <div class="client-name-sidebar">
          <span>${escapeHtml(c.name)}</span>
          <small class="client-phone-sidebar">${escapeHtml(c.phone)}</small>
        </div>
      </div>
    `;
  }).join('');
  container.innerHTML = html;
}

async function loadClientHistory(clientId, container) {
  // Mostrar skeletons inmediatamente
  showSkeletonCards(container, 3);

  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = `<p>Cliente no encontrado.</p>`;
    return;
  }
  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));

  const servicesHtml = sorted.length === 0 
    ? `<div class="empty-state"><i class="fas fa-cut fa-3x"></i><p>${t('noServices')}</p></div>`
    : sorted.map(s => renderServiceCardDashboard(s)).join('');

  const toggleId = `toggle-${clientId}`;
  container.innerHTML = `
    <div class="history-header">
      <div class="history-service-count">${services.length} servicio(s) registrado(s)</div>
      <h2 class="history-title">Historial de Servicio</h2>
      <p class="history-client-name">Cliente: ${escapeHtml(client.name)}</p>
      <p class="history-client-phone"><i class="fas fa-phone-alt"></i> ${escapeHtml(client.phone)}</p>
      <a href="https://wa.me/${client.phone.replace(/\D/g,'')}" class="whatsapp-link" style="display:none;" target="_blank" rel="noopener noreferrer" aria-label="Enviar mensaje por WhatsApp">
        <i class="fab fa-whatsapp"></i> Contactar
      </a>
      <div class="history-divider"></div>
      <button class="toggle-services-btn" data-target="${toggleId}" aria-expanded="true">
        <i class="fas fa-chevron-up"></i> <span>Ocultar servicios</span>
      </button>
    </div>
    <div id="${toggleId}" class="services-container">
      ${servicesHtml}
      <div class="add-service-card" id="add-service-area">
        <div class="add-service-card-content">
          <i class="fas fa-plus-circle fa-2x"></i>
          <span>Agregar nuevo servicio</span>
        </div>
      </div>
    </div>
  `;

  // Toggle de servicios
  const toggleBtn = container.querySelector('.toggle-services-btn');
  const servicesContainer = document.getElementById(toggleId);
  toggleBtn.addEventListener('click', () => {
    const isVisible = !servicesContainer.classList.contains('hidden');
    if (isVisible) {
      servicesContainer.classList.add('hidden');
      toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> <span>Mostrar servicios</span>';
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      servicesContainer.classList.remove('hidden');
      toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> <span>Ocultar servicios</span>';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Evento para agregar servicio
  document.getElementById('add-service-area').addEventListener('click', () => openNewServiceModal());

  // Eventos para editar/eliminar servicios
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

function renderServiceCardDashboard(service) {
  const images = [];
  if (service.beforeImg) images.push(service.beforeImg);
  if (service.afterImg) images.push(service.afterImg);
  if (service.afterLateralImg) images.push(service.afterLateralImg);
  const imagesJson = escapeHtml(JSON.stringify(images));
  const beforeIdx = images.indexOf(service.beforeImg);
  const afterIdx = images.indexOf(service.afterImg);
  const lateralIdx = images.indexOf(service.afterLateralImg);

  return `
    <div class="service-card-dashboard" data-service-id="${escapeHtml(service.id)}">
      <div class="service-card-header">
        <span class="service-date">${formatDateSpanish(service.date)}</span>
        <span class="service-type-badge">${escapeHtml(service.type)}</span>
      </div>
      <div class="service-images-grid" data-images='${imagesJson}'>
        <div class="image-card image-item" data-index="${beforeIdx >= 0 ? beforeIdx : 0}">
          <div class="image-label">ANTES</div>
          ${service.beforeImg 
            ? `<img src="${escapeHtml(service.beforeImg)}" alt="Antes" loading="lazy" />`
            : '<div class="image-placeholder">Sin foto</div>'}
        </div>
        <div class="image-card image-item" data-index="${afterIdx >= 0 ? afterIdx : 0}">
          <div class="image-label">DESPUÉS FRONTAL</div>
          ${service.afterImg 
            ? `<img src="${escapeHtml(service.afterImg)}" alt="Después frontal" loading="lazy" />`
            : '<div class="image-placeholder">Sin foto</div>'}
        </div>
        <div class="image-card image-item" data-index="${lateralIdx >= 0 ? lateralIdx : 0}">
          <div class="image-label">DESPUÉS LATERAL</div>
          ${service.afterLateralImg 
            ? `<img src="${escapeHtml(service.afterLateralImg)}" alt="Después lateral" loading="lazy" />`
            : '<div class="image-placeholder">Sin foto</div>'}
        </div>
      </div>
      ${service.notes ? `
      <div class="service-notes-dashboard">
        <div class="notes-bar"></div>
        <div class="notes-text">${escapeHtml(service.notes)}</div>
      </div>` : ''}
      <div class="service-actions-dashboard">
        <button class="btn-edit-service-dash" data-id="${escapeHtml(service.id)}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete-service-dash" data-id="${escapeHtml(service.id)}">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `;
}

function formatDateSpanish(dateStr) {
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ── CRUD de cliente y servicios ──

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