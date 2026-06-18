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
let currentSidebarFilter = 'all'; // 'all' or 'withServices'
let resetMainViewFn; // 🔹 Callback to go back to home (shared)

export async function initProfessionalView(main) {
  document.body.classList.add('dashboard-mode');

  main.innerHTML = `
    <!-- Drawer overlay (mobile) -->
    <div class="drawer-overlay" id="drawer-overlay"></div>

    <!-- Sidebar -->
    <aside class="dashboard-sidebar" id="dashboard-sidebar">
      <div class="sidebar-brand">
        <h1 class="sidebar-logo">StyleRecord Lite</h1>
        <p class="sidebar-subtitle">Beauty Management</p>
      </div>

      <button class="btn-new-client" id="btn-new-client">
        <span class="material-symbols-outlined">person_add</span>
        New Client
      </button>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Dashboard</div>
        <a class="sidebar-nav-item active" href="#" data-filter="all" id="nav-clientes">
          <span class="material-symbols-outlined">group</span>
          <span>Clients</span>
        </a>
        <a class="sidebar-nav-item" href="#" data-filter="withServices" id="nav-servicios">
          <span class="material-symbols-outlined">content_cut</span>
          <span>Services</span>
        </a>

        <div class="sidebar-section-label">Recent Clients</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">
            <span class="material-symbols-outlined">person</span>
          </div>
          <span class="sidebar-user-name">Staff #04</span>
        </div>
        <button class="sidebar-logout" id="btn-logout-dash" title="Log out">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="dashboard-main">
      <!-- Header -->
      <header class="dashboard-header">
        <button class="btn-hamburger" id="btn-hamburger" aria-label="Menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <!-- 🔹 Desktop: home button -->
        <button class="btn-home-desktop" id="btn-home-desktop" title="Back to home" aria-label="Home">
          <span class="material-symbols-outlined">dashboard</span>
        </button>
        <div class="dashboard-search">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="dashboard-search" placeholder="Search client..." autocomplete="off" />
          <!-- 🔹 Suggestions dropdown -->
          <ul id="search-dropdown" class="search-dropdown hidden"></ul>
        </div>
        <div class="dashboard-header-actions">
          <button class="header-icon-btn" id="btn-notifications" aria-label="Notifications">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="header-icon-btn" id="btn-settings" aria-label="Settings">
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

    <!-- 🔹 NEW (mobile): Floating button to go back to home -->
    <button class="fab-home-mobile" id="fab-home-mobile" title="Back to home" aria-label="Home">
      <span class="material-symbols-outlined">home</span>
    </button>

    <!-- FAB (always visible on mobile, contextual action) -->
    <button class="fab" id="fab-add-service" title="New client or service">
      <span class="material-symbols-outlined">add</span>
    </button>

    <!-- Bottom Navigation (mobile only) -->
    <nav class="bottom-nav" id="bottom-nav">
      <button class="bottom-nav-btn active" data-nav="dashboard">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Home</span>
      </button>
      <button class="bottom-nav-btn" data-nav="clients">
        <span class="material-symbols-outlined">group</span>
        <span>Clients</span>
      </button>
      <button class="bottom-nav-btn" data-nav="services">
        <span class="material-symbols-outlined">content_cut</span>
        <span>Services</span>
      </button>
      <button class="bottom-nav-btn" data-nav="config">
        <span class="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </button>
    </nav>
  `;

  // Drawer logic
  const drawer = document.getElementById('dashboard-sidebar');
  const overlay = document.getElementById('drawer-overlay');
  const hamburger = document.getElementById('btn-hamburger');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  hamburger.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Logout
  document.getElementById('btn-logout-dash').addEventListener('click', () => {
    document.body.classList.remove('dashboard-mode');
    logout();
    window.location.hash = '/home';
    window.location.reload();
  });

  // Sidebar navigation (Clients / Services)
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

  // Settings icon
  document.getElementById('btn-settings').addEventListener('click', () => {
    showToast('Settings coming soon', 'info');
  });

  // Notifications (placeholder)
  document.getElementById('btn-notifications').addEventListener('click', () => {
    showToast('No new notifications', 'info');
  });

  // Load initial clients
  const clients = await loadClients();
  const sidebarList = document.getElementById('sidebar-client-list');
  const mainContent = document.getElementById('main-content-area');
  const searchInput = document.getElementById('dashboard-search');
  const searchDropdown = document.getElementById('search-dropdown');

  // 🔹 Function to reset the main area
  resetMainViewFn = async () => {
    setSelectedClientId(null);
    document.querySelectorAll('.sidebar-client-item').forEach(el => el.classList.remove('selected'));
    const allClients = await loadClients();
    await showInitialDashboardView(mainContent, allClients);
  };

  // Refresh sidebar applying filter
  refreshSidebarFn = async (filterText = '') => {
    const allClients = await loadClients();
    let filtered = filterText
      ? allClients.filter(c => c.name.toLowerCase().includes(filterText.toLowerCase()) || c.phone.includes(filterText))
      : allClients;

    if (currentSidebarFilter === 'withServices') {
      filtered = filtered.filter(c => c.services && c.services.length > 0);
    }

    renderSidebarClients(sidebarList, filtered);
    // 🔹 Update suggestions dropdown
    updateSearchDropdown(filtered, filterText);
  };

  renderSidebarClients(sidebarList, clients);

  // Events on the client list (sidebar)
  sidebarList.addEventListener('click', async (e) => {
    const item = e.target.closest('.sidebar-client-item');
    if (!item) return;
    const clientId = item.dataset.id;
    setSelectedClientId(clientId);
    document.querySelectorAll('.sidebar-client-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    await loadClientHistory(clientId, mainContent);
    closeDrawer();
    searchDropdown.classList.add('hidden');
    searchInput.value = '';
  });

  // 🔹 Home button (desktop)
  document.getElementById('btn-home-desktop').addEventListener('click', () => {
    resetMainViewFn();
    searchInput.value = '';
    searchDropdown.classList.add('hidden');
  });

  // 🔹 NEW (mobile): Floating home button
  document.getElementById('fab-home-mobile').addEventListener('click', () => {
    resetMainViewFn();
    searchInput.value = '';
    searchDropdown.classList.add('hidden');
    // Optional: close drawer if open
    closeDrawer();
  });

  // New client (sidebar button)
  document.getElementById('btn-new-client').addEventListener('click', () => {
    closeDrawer();
    openNewClientModal();
  });

  // Search with debounce
  searchInput.addEventListener('input', debounce(async (e) => {
    const value = e.target.value;
    await refreshSidebarFn(value);
  }, 300));

  // 🔹 Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dashboard-search')) {
      searchDropdown.classList.add('hidden');
    }
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      searchDropdown.classList.remove('hidden');
    }
  });

  // ─── Contextual FAB ───
  document.getElementById('fab-add-service').addEventListener('click', () => {
    if (selectedClientId) {
      openNewServiceModal();
    } else {
      openNewClientModal();
    }
  });

  // ─── Bottom Navigation Events ───
  document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const nav = btn.dataset.nav;
      if (nav === 'dashboard') {
        resetMainViewFn();
      } else if (nav === 'clients') {
        currentSidebarFilter = 'all';
        setActiveNav('all');
        refreshSidebarFn(searchInput.value);
        openDrawer();
      } else if (nav === 'services') {
        currentSidebarFilter = 'withServices';
        setActiveNav('withServices');
        refreshSidebarFn(searchInput.value);
        openDrawer();
      } else if (nav === 'config') {
        showToast('Settings coming soon', 'info');
      }
    });
  });

  // Initial state
  showInitialDashboardView(mainContent, clients);
}

// 🔹 Update suggestions dropdown
function updateSearchDropdown(filteredClients, query) {
  const dropdown = document.getElementById('search-dropdown');
  if (!dropdown) return;

  if (!query || filteredClients.length === 0) {
    dropdown.classList.add('hidden');
    return;
  }

  const html = filteredClients.slice(0, 6).map(c => {
    const initials = c.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    const lastService = c.services?.length
      ? c.services.reduce((latest, s) => new Date(s.date) > new Date(latest.date) ? s : latest)
      : null;
    const meta = lastService
      ? `${formatTimeAgo(lastService.date)} · ${escapeHtml(lastService.type)}`
      : 'No services';
    return `
      <li class="search-dropdown-item" data-client-id="${escapeHtml(c.id)}">
        <div class="client-avatar-circle">${initials}</div>
        <div class="client-item-info">
          <p class="client-item-name">${escapeHtml(c.name)}</p>
          <p class="client-item-time">${meta}</p>
        </div>
      </li>
    `;
  }).join('');

  dropdown.innerHTML = html;
  dropdown.classList.remove('hidden');

  // Events for each suggestion
  dropdown.querySelectorAll('.search-dropdown-item').forEach(item => {
    item.addEventListener('click', async () => {
      const clientId = item.dataset.clientId;
      setSelectedClientId(clientId);
      const mainContent = document.getElementById('main-content-area');
      await loadClientHistory(clientId, mainContent);
      dropdown.classList.add('hidden');
      document.getElementById('dashboard-search').value = '';
      // Close drawer on mobile if open
      document.getElementById('dashboard-sidebar').classList.remove('open');
      document.getElementById('drawer-overlay').classList.remove('open');
    });
  });
}

// ─── Initial dashboard view (empty state + recent clients) ───
function showInitialDashboardView(container, clients) {
  const recentClientsHtml = clients.length > 0
    ? `
      <section class="recent-clients-section">
        <h3 class="recent-clients-title">Recent Clients</h3>
        <div class="recent-clients-list">
          ${clients.slice(0, 5).map(c => {
            const initials = c.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
            const lastService = c.services?.length
              ? c.services.reduce((latest, s) => new Date(s.date) > new Date(latest.date) ? s : latest)
              : null;
            const meta = lastService
              ? `${formatTimeAgo(lastService.date)} · ${escapeHtml(lastService.type)}`
              : 'No services';
            return `
              <button class="recent-client-card" data-client-id="${escapeHtml(c.id)}">
                <div class="recent-client-info">
                  <div class="recent-client-avatar">${initials}</div>
                  <div>
                    <div class="recent-client-name">${escapeHtml(c.name)}</div>
                    <div class="recent-client-meta">${meta}</div>
                  </div>
                </div>
                <span class="material-symbols-outlined recent-client-chevron">chevron_right</span>
              </button>
            `;
          }).join('')}
        </div>
      </section>`
    : '';

  container.innerHTML = `
    <div class="empty-dashboard">
      <span class="material-symbols-outlined">content_cut</span>
      <h3>Start your day</h3>
      <p>Select a client to view their history and manage their services today.</p>
    </div>
    ${recentClientsHtml}
  `;

  // Events on recent client cards
  container.querySelectorAll('.recent-client-card').forEach(card => {
    card.addEventListener('click', async () => {
      const clientId = card.dataset.clientId;
      setSelectedClientId(clientId);
      await loadClientHistory(clientId, container);
    });
  });
}

// ─── Render the client list in the sidebar ───
function renderSidebarClients(container, clients) {
  if (clients.length === 0) {
    container.innerHTML = `<p class="sidebar-empty">No clients</p>`;
    return;
  }
  const html = clients.map(c => {
    const initials = c.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    const lastService = c.services?.length
      ? c.services.reduce((latest, s) => new Date(s.date) > new Date(latest.date) ? s : latest)
      : null;
    const timeAgo = lastService ? formatTimeAgo(lastService.date) : 'No services';
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

// ─── Load a client's history into the main area ───
async function loadClientHistory(clientId, container) {
  const client = await getClientById(clientId);
  if (!client) {
    container.innerHTML = `<p>Client not found.</p>`;
    return;
  }
  const services = await getServicesByClientId(clientId);
  const sorted = [...services].sort((a, b) => new Date(b.date) - new Date(a.date));
  const initials = client.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);

  container.innerHTML = `
    <!-- Client Header -->
    <div class="client-detail-header">
      <!-- 🔹 Button to go back to home (also on mobile) -->
      <button class="btn-back-dashboard" id="btn-back-dashboard" title="Back to home">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
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
            ${services.length} services completed
          </span>
        </div>
      </div>
      <div class="client-detail-actions">
        <button class="btn-toggle-services" id="btn-toggle-services">
          <span class="material-symbols-outlined">visibility_off</span>
          <span>Hide services</span>
        </button>
        <button class="btn-edit-profile" id="btn-edit-profile">
          <span class="material-symbols-outlined">edit</span>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="services-grid" id="services-grid">
      ${sorted.length === 0 ? `
        <div class="empty-services">
          <span class="material-symbols-outlined">content_cut</span>
          <p>No services registered</p>
        </div>
      ` : sorted.map(s => renderServiceCardDashboard(s)).join('')}
      
      <button class="add-service-card-dash" id="add-service-area">
        <div class="add-service-icon">
          <span class="material-symbols-outlined">add</span>
        </div>
        <div class="add-service-text">
          <h3>Add new service</h3>
          <p>Register a new procedure for this client</p>
        </div>
      </button>
    </div>

    <footer class="dashboard-footer">
      <p>© 2026 StyleRecord Lite - Professional Beauty Management</p>
    </footer>
  `;

  // 🔹 Event for the "Back" button
  document.getElementById('btn-back-dashboard').addEventListener('click', () => {
    if (resetMainViewFn) resetMainViewFn();
  });

  // Toggle services
  const toggleBtn = document.getElementById('btn-toggle-services');
  const servicesGrid = document.getElementById('services-grid');
  let servicesVisible = true;
  toggleBtn.addEventListener('click', () => {
    servicesVisible = !servicesVisible;
    servicesGrid.style.display = servicesVisible ? '' : 'none';
    toggleBtn.querySelector('span:last-child').textContent = servicesVisible ? 'Hide services' : 'Show services';
    toggleBtn.querySelector('.material-symbols-outlined').textContent = servicesVisible ? 'visibility_off' : 'visibility';
  });

  // Edit profile
  document.getElementById('btn-edit-profile').addEventListener('click', () => openEditClientModal(client));

  // Add service from the button in the list
  document.getElementById('add-service-area').addEventListener('click', () => openNewServiceModal());

  // Events on service cards
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

// ─── Render a service card ───
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
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
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
          <p class="service-stylist">Performed by: Staff</p>
        </div>
        <div class="service-card-actions">
          <button class="btn-icon-service btn-edit-service-dash" data-id="${escapeHtml(service.id)}" title="Edit">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn-icon-service btn-delete-service-dash" data-id="${escapeHtml(service.id)}" title="Delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <div class="service-card-body">
        <div class="service-images-grid" data-images='${imagesJson}'>
          <div class="image-card image-item" data-index="${beforeIdx >= 0 ? beforeIdx : 0}">
            ${service.beforeImg 
              ? `<img src="${escapeHtml(service.beforeImg)}" alt="Before" loading="lazy" />`
              : '<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>'}
            <span class="image-label">BEFORE</span>
          </div>
          <div class="image-card image-item" data-index="${afterIdx >= 0 ? afterIdx : 0}">
            ${service.afterImg 
              ? `<img src="${escapeHtml(service.afterImg)}" alt="After front" loading="lazy" />`
              : '<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>'}
            <span class="image-label">AFTER FRONT</span>
          </div>
          <div class="image-card image-item" data-index="${lateralIdx >= 0 ? lateralIdx : 0}">
            ${service.afterLateralImg 
              ? `<img src="${escapeHtml(service.afterLateralImg)}" alt="After side" loading="lazy" />`
              : '<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>'}
            <span class="image-label">AFTER SIDE</span>
          </div>
        </div>
        ${service.notes ? `
        <div class="service-notes">
          <h4 class="service-notes-title">Service Notes</h4>
          <p>${escapeHtml(service.notes)}</p>
        </div>` : ''}
      </div>
    </div>
  `;
}

// ─── Relative time formatting ───
function formatTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} minutes ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US');
}

// ─── Modal: New Client ───
async function openNewClientModal() {
  const countryOptions = countries
    .map(c => `<option value="${c.dialCode}" ${c.code === 'PE' ? 'selected' : ''}>${c.flag} ${c.name} (${c.dialCode})</option>`)
    .join('');

  const formHtml = `
    <form id="new-client-form">
      <label>Full name:</label>
      <input type="text" id="client-name" placeholder="Full name" required />
      <div class="field-error" id="error-client-name"></div>
      <label>Country:</label>
      <select id="client-country" required style="width:100%; margin-bottom:0.8rem;">
        ${countryOptions}
      </select>
      <label>Phone number (without prefix):</label>
      <input type="tel" id="client-phone" placeholder="987654321" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validate and Save</button>
    </form>
  `;

  showModal('New Client', formHtml);
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
      validationArea.innerHTML = `<div class="validation-error">The phone number is already registered.</div>`;
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Validating...';
    validationArea.innerHTML = '';

    try {
      const result = await validatePhone(fullPhone);
      validationArea.innerHTML = `
        <div class="validation-result">
          <span class="material-symbols-outlined" style="color:green;">check_circle</span> Valid number<br>
          <strong>${escapeHtml(result.number)}</strong><br>
          Country: ${escapeHtml(result.country_name)} (${escapeHtml(result.country_code)})<br>
          Carrier: ${escapeHtml(result.carrier)}
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
      showSuccess('Client created successfully');
    } catch (error) {
      if (error.name === 'InvalidPhoneError') {
        validationArea.innerHTML = `
          <div class="validation-error">The number is not valid.</div>
          <label><input type="checkbox" id="manual-save"> Save anyway</label>
          <button type="button" id="force-save-btn">Save manually</button>`;
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
      btn.innerHTML = 'Validate and Save';
    }
  });
}

// ─── Modal: Edit Client ───
async function openEditClientModal(client) {
  const formHtml = buildEditClientForm(client);
  showModal('Edit Client', formHtml);
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
    showSuccess('Client updated');
  });
}

// ─── Modal: New Service ───
async function openNewServiceModal() {
  if (!selectedClientId) {
    showError('Select a client first.');
    return;
  }
  const placeholders = getBeforeAfterPlaceholders();
  showModal('Add Service', buildNewServiceForm(placeholders.beforeImg, placeholders.afterImg, placeholders.afterLateralImg));
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
    showSuccess('Service added');
  });
}

// ─── Edit Service ───
async function handleEditService(serviceId) {
  const services = await getServicesByClientId(selectedClientId);
  const service = services.find(s => s.id === serviceId);
  if (!service) return;
  showModal('Edit Service', buildEditServiceForm(service));
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
    showSuccess('Service updated');
  });
}

// ─── Delete Service ───
async function handleDeleteService(serviceId) {
  const confirmed = await showConfirmModal('Delete this service?');
  if (!confirmed) return;
  await deleteService(selectedClientId, serviceId);
  const mainContent = document.getElementById('main-content-area');
  await loadClientHistory(selectedClientId, mainContent);
  showSuccess('Service deleted');
}

// ─── Display form errors ───
function displayFormErrors(prefix, errors) {
  const fields = ['name', 'phone', 'type', 'date'];
  fields.forEach(f => {
    const el = document.getElementById(`error-${prefix}-${f}`);
    if (el) el.textContent = errors[f] || '';
  });
}