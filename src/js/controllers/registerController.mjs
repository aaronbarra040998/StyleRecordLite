import { 
  saveProfessional, 
  saveCompany, 
  saveLinkRequest, 
  getCompaniesByName 
} from '../db.mjs';
import { 
  validateProfessionalType, 
  validateModality, 
  validateBusinessName, 
  validateAddress, 
  validateCompanyName 
} from '../validators.mjs';
import { showSuccess } from '../toast.mjs';
import { escapeHtml } from '../utils.mjs';
import { getPlaceholderImage } from '../loremPicsum.mjs';

let currentStep = 0;
const state = {
  type: '',
  modality: '',
  businessName: '',
  address: '',
  workFromHome: false,
  companyId: '',
  companyName: '',
  requestLink: false,
};

export function initRegisterView(container) {
  currentStep = 0;
  Object.keys(state).forEach(k => {
    state[k] = (state[k] === false) ? false : '';
  });
  state.workFromHome = false;
  state.requestLink = false;
  renderStep(container);
}

function renderStep(container) {
  const totalSteps = 3;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const heroImg = getPlaceholderImage(800, 200, 'salon');

  container.innerHTML = `
    <section class="register-view-container fade-in">
      <!-- Stepper -->
      <div class="stepper">
        <div class="stepper-track">
          <div class="stepper-progress" style="width: ${progress}%"></div>
        </div>
        <div class="stepper-steps">
          <div class="stepper-step ${currentStep >= 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}">
            <div class="step-circle">1</div>
            <span class="step-label ${currentStep >= 0 ? 'active' : ''}">Profile</span>
          </div>
          <div class="stepper-line ${currentStep >= 1 ? 'active' : ''}"></div>
          <div class="stepper-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}">
            <div class="step-circle">2</div>
            <span class="step-label ${currentStep >= 1 ? 'active' : ''}">Portfolio</span>
          </div>
          <div class="stepper-line ${currentStep >= 2 ? 'active' : ''}"></div>
          <div class="stepper-step ${currentStep >= 2 ? 'active' : ''}">
            <div class="step-circle">3</div>
            <span class="step-label ${currentStep >= 2 ? 'active' : ''}">Verification</span>
          </div>
        </div>
      </div>

      <!-- Form card -->
      <div class="register-card">
        <div class="register-card-header">
          <h1 class="register-card-title">${getStepTitle(currentStep)}</h1>
          <p class="register-card-subtitle">${getStepSubtitle(currentStep)}</p>
        </div>

        <div class="register-card-body">
          ${getStepContent(currentStep)}
        </div>
      </div>

      <!-- Trust badges -->
      <div class="register-trust">
        <div class="trust-item">
          <span class="material-symbols-outlined">lock</span>
          <span>Encrypted data</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <span class="material-symbols-outlined">verified</span>
          <span>Certified Platform</span>
        </div>
      </div>
    </section>
  `;

  // Cancel button event
  const cancelBtn = document.getElementById('btn-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      // Redirect to role selection or home
      window.location.hash = '/rol';
    });
  }

  // Navigation events
  if (currentStep > 0) {
    const prevBtn = document.getElementById('btn-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentStep--;
        renderStep(container);
      });
    }
  }
  const nextBtn = document.getElementById('btn-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => handleNext(container));
  }

  if (currentStep === 0) attachStep0Listeners();
  if (currentStep === 1) attachStep1Listeners();
}

function getStepTitle(step) {
  switch(step) {
    case 0: return 'Professional Information';
    case 1: return 'Business Details';
    case 2: return 'Registration Summary';
    default: return '';
  }
}

function getStepSubtitle(step) {
  switch(step) {
    case 0: return 'Complete your specialty details to start managing your schedule with StyleRecord Lite.';
    case 1: return state.modality === 'independent' 
      ? 'Set up your independent activity details.'
      : 'Link your profile with the company you work for.';
    case 2: return 'Review all the information before finalizing.';
    default: return '';
  }
}

function getStepContent(step) {
  switch(step) {
    case 0: return getStep0HTML();
    case 1: return getStep1HTML();
    case 2: return getStep2HTML();
    default: return '';
  }
}

function getStep0HTML() {
  return `
    <form id="step0-form" class="register-form">
      <div class="form-group">
        <label class="form-label" for="prof-type">Professional type</label>
        <div class="select-wrapper-register">
          <select id="prof-type" class="form-select" required>
            <option value="" disabled ${!state.type ? 'selected' : ''}>Select your specialty</option>
            <option value="barbero" ${state.type === 'barbero' ? 'selected' : ''}>Barber</option>
            <option value="estilista" ${state.type === 'estilista' ? 'selected' : ''}>Stylist</option>
            <option value="lashista" ${state.type === 'lashista' ? 'selected' : ''}>Lash Artist</option>
            <option value="colorista" ${state.type === 'colorista' ? 'selected' : ''}>Colorist</option>
            <option value="otros" ${state.type === 'otros' ? 'selected' : ''}>Other</option>
          </select>
          <span class="material-symbols-outlined select-icon">expand_more</span>
        </div>
        <div class="field-error" id="error-type"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Work modality</label>
        <div class="radio-cards">
          <label class="radio-card ${state.modality === 'independent' ? 'selected' : ''}">
            <input type="radio" name="modality" value="independent" ${state.modality === 'independent' ? 'checked' : ''} class="radio-input" />
            <span class="material-symbols-outlined radio-icon">person_pin</span>
            <span class="radio-title">Independent</span>
            <span class="radio-desc">You work on your own or at clients' homes.</span>
          </label>
          <label class="radio-card ${state.modality === 'employed' ? 'selected' : ''}">
            <input type="radio" name="modality" value="employed" ${state.modality === 'employed' ? 'checked' : ''} class="radio-input" />
            <span class="material-symbols-outlined radio-icon">store</span>
            <span class="radio-title">Employee</span>
            <span class="radio-desc">You are part of a salon or clinic team.</span>
          </label>
        </div>
        <div class="field-error" id="error-modality"></div>
      </div>

      <div class="register-decoration">
        <img src="${getPlaceholderImage(800, 200, 'salon-deco')}" alt="Professional salon" loading="lazy" />
        <div class="decoration-overlay"></div>
      </div>

      <div class="form-actions">
        <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
        <button type="button" id="btn-next" class="btn-gold-gradient">
          <span>Next</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </form>
  `;
}

function getStep1HTML() {
  if (state.modality === 'independent') {
    return `
      <form id="step1-form" class="register-form">
        <div class="form-group">
          <label class="form-label" for="business-name">Business / Professional name</label>
          <input type="text" id="business-name" class="form-input" value="${escapeHtml(state.businessName)}" placeholder="e.g. Beauty Studio" required />
          <div class="field-error" id="error-business-name"></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="address">Address</label>
          <input type="text" id="address" class="form-input" value="${escapeHtml(state.address)}" placeholder="Location address" />
          <div class="field-error" id="error-address"></div>
        </div>
        <label class="checkbox-label">
          <input type="checkbox" id="work-from-home" ${state.workFromHome ? 'checked' : ''} />
          <span class="checkmark"></span>
          Work from home (no physical location)
        </label>
        <div class="form-actions">
          <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
          <button type="button" id="btn-prev" class="btn-outline">Previous</button>
          <button type="button" id="btn-next" class="btn-gold-gradient">
            <span>Next</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    `;
  } else {
    return `
      <form id="step1-form" class="register-form">
        <div class="form-group">
          <label class="form-label">Search existing company</label>
          <div class="autocomplete-wrapper">
            <input type="text" id="company-search" class="form-input" placeholder="Company name..." autocomplete="off" />
            <ul id="company-suggestions" class="autocomplete-list hidden"></ul>
          </div>
        </div>
        <div class="or-divider"><span>or</span></div>
        <div class="form-group">
          <label class="form-label" for="new-company-name">Register new company</label>
          <input type="text" id="new-company-name" class="form-input" value="${escapeHtml(state.companyName)}" placeholder="Company name" />
          <div class="field-error" id="error-company-name"></div>
          <input type="hidden" id="selected-company-id" value="${escapeHtml(state.companyId)}" />
          <p id="selected-company-display" class="selected-company"></p>
        </div>
        <div class="form-actions">
          <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
          <button type="button" id="btn-prev" class="btn-outline">Previous</button>
          <button type="button" id="btn-next" class="btn-gold-gradient">
            <span>Next</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    `;
  }
}

function getStep2HTML() {
  let summary = '<ul class="summary-list">';
  summary += `<li><strong>Type:</strong> ${escapeHtml(state.type)}</li>`;
  summary += `<li><strong>Modality:</strong> ${state.modality === 'independent' ? 'Independent' : 'Employee'}</li>`;
  if (state.modality === 'independent') {
    summary += `<li><strong>Name:</strong> ${escapeHtml(state.businessName)}</li>`;
    if (!state.workFromHome) {
      summary += `<li><strong>Address:</strong> ${escapeHtml(state.address)}</li>`;
    } else {
      summary += `<li><strong>Work from home:</strong> Yes</li>`;
    }
  } else {
    if (state.companyId) {
      summary += `<li><strong>Company:</strong> ${escapeHtml(state.companyName)} (ID: ${escapeHtml(state.companyId)})</li>`;
    } else {
      summary += `<li><strong>New company:</strong> ${escapeHtml(state.companyName)}</li>`;
    }
    summary += `<li><strong>Request linking:</strong> ${state.requestLink ? 'Yes' : 'No'}</li>`;
  }
  summary += '</ul>';

  return `
    <div class="register-form">
      <div class="summary-box">
        ${summary}
      </div>
      <div class="form-actions">
        <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
        <button type="button" id="btn-prev" class="btn-outline">Previous</button>
        <button type="button" id="btn-next" class="btn-gold-gradient">
          <span>Finish</span>
          <span class="material-symbols-outlined">check</span>
        </button>
      </div>
    </div>
  `;
}

async function handleNext(container) {
  if (currentStep === 0) {
    if (!validateStep0()) return;
    currentStep++;
    renderStep(container);
  } else if (currentStep === 1) {
    if (!validateStep1()) return;
    currentStep++;
    renderStep(container);
  } else if (currentStep === 2) {
    await finalizeRegistration();
    showSuccess('Registration completed successfully.');
    const { loginAsProfessional } = await import('../auth.mjs');
    loginAsProfessional('1234');
    window.location.hash = '/professional';
  }
}

function validateStep0() {
  const type = document.getElementById('prof-type')?.value;
  const modality = document.querySelector('input[name="modality"]:checked')?.value;
  const errType = validateProfessionalType(type);
  const errModality = validateModality(modality);
  document.getElementById('error-type').textContent = errType || '';
  document.getElementById('error-modality').textContent = errModality || '';
  if (errType || errModality) return false;
  state.type = type;
  state.modality = modality;
  return true;
}

function validateStep1() {
  if (state.modality === 'independent') {
    const name = document.getElementById('business-name')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const workFromHome = document.getElementById('work-from-home')?.checked || false;
    const errName = validateBusinessName(name);
    let errAddress = null;
    if (!workFromHome) errAddress = validateAddress(address);
    document.getElementById('error-business-name').textContent = errName || '';
    document.getElementById('error-address').textContent = errAddress || '';
    if (errName || errAddress) return false;
    state.businessName = name;
    state.address = address;
    state.workFromHome = workFromHome;
    return true;
  } else {
    const companyId = document.getElementById('selected-company-id')?.value;
    const newCompanyName = document.getElementById('new-company-name')?.value.trim();
    if (!companyId && !newCompanyName) {
      document.getElementById('error-company-name').textContent = 'You must select a company or enter a new name.';
      return false;
    }
    if (newCompanyName && !companyId) {
      const err = validateCompanyName(newCompanyName);
      if (err) {
        document.getElementById('error-company-name').textContent = err;
        return false;
      }
      state.companyName = newCompanyName;
      state.companyId = '';
    } else if (companyId) {
      state.companyId = companyId;
      const display = document.getElementById('selected-company-display');
      state.companyName = display ? display.textContent.replace('Company: ', '') : '';
    }
    state.requestLink = true;
    return true;
  }
}

async function finalizeRegistration() {
  const professionalId = 'prof_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  const professional = {
    id: professionalId,
    type: state.type,
    modality: state.modality,
    createdAt: new Date().toISOString(),
  };
  if (state.modality === 'independent') {
    professional.businessName = state.businessName;
    professional.address = state.workFromHome ? 'A domicilio' : state.address;
    professional.workFromHome = state.workFromHome;
  }
  await saveProfessional(professional);
  if (state.modality === 'employed') {
    let companyId = state.companyId;
    if (!companyId) {
      companyId = 'comp_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      await saveCompany({ id: companyId, name: state.companyName, createdAt: new Date().toISOString() });
    }
    await saveLinkRequest({
      id: 'link_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      professionalId,
      companyId,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    });
  }
}

// ─── Auxiliary listeners ───
function attachStep0Listeners() {
  const radios = document.querySelectorAll('input[name="modality"]');
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      document.querySelectorAll('.radio-card').forEach(card => card.classList.remove('selected'));
      this.closest('.radio-card').classList.add('selected');
    });
  });
}

function attachStep1Listeners() {
  if (state.modality === 'employed') {
    const searchInput = document.getElementById('company-search');
    const suggestionsList = document.getElementById('company-suggestions');
    const newCompanyInput = document.getElementById('new-company-name');
    
    searchInput?.addEventListener('input', async (e) => {
      const query = e.target.value.trim();
      if (query.length < 2) {
        suggestionsList.classList.add('hidden');
        return;
      }
      const companies = await getCompaniesByName(query);
      suggestionsList.innerHTML = companies.length === 0
        ? '<li class="no-results">No companies found</li>'
        : companies.map(c => `<li data-id="${escapeHtml(c.id)}">${escapeHtml(c.name)}</li>`).join('');
      suggestionsList.classList.remove('hidden');
    });

    suggestionsList?.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li || !li.dataset.id) return;
      document.getElementById('selected-company-id').value = li.dataset.id;
      document.getElementById('selected-company-display').textContent = `Company: ${li.textContent}`;
      searchInput.value = li.textContent;
      suggestionsList.classList.add('hidden');
      newCompanyInput.value = '';
      document.getElementById('error-company-name').textContent = '';
    });

    newCompanyInput?.addEventListener('input', () => {
      document.getElementById('selected-company-id').value = '';
      document.getElementById('selected-company-display').textContent = '';
      searchInput.value = '';
      suggestionsList.innerHTML = '';
      suggestionsList.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.autocomplete-wrapper')) {
        suggestionsList?.classList.add('hidden');
      }
    });
  }
}