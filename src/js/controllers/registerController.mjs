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
  Object.keys(state).forEach(k => state[k] = state[k] === false ? false : '');
  state.workFromHome = false;
  state.requestLink = false;
  renderStep(container);
}

function renderStep(container) {
  const totalSteps = 3;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  container.innerHTML = `
    <section class="register-view active">
      <div class="stepper">
        <div class="stepper-progress" style="width: ${progress}%"></div>
        <div class="stepper-steps">
          <div class="stepper-step ${currentStep >= 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}">1</div>
          <div class="stepper-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}">2</div>
          <div class="stepper-step ${currentStep >= 2 ? 'active' : ''}">3</div>
        </div>
      </div>
      <div class="stepper-content">
        ${getStepContent(currentStep)}
      </div>
      <div class="stepper-actions">
        ${currentStep > 0 ? '<button id="btn-prev" class="btn-prev">Anterior</button>' : ''}
        <button id="btn-next" class="btn-next">${currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}</button>
      </div>
    </section>
  `;

  if (currentStep > 0) {
    document.getElementById('btn-prev').addEventListener('click', () => {
      currentStep--;
      renderStep(container);
    });
  }
  document.getElementById('btn-next').addEventListener('click', () => handleNext(container));

  if (currentStep === 0) attachStep1Listeners();
  if (currentStep === 1) attachStep2Listeners();
}

function getStepContent(step) {
  switch(step) {
    case 0: return getStep1HTML();
    case 1: return getStep2HTML();
    case 2: return getStep3HTML();
    default: return '';
  }
}

function getStep1HTML() {
  return `
    <h3>Información Profesional</h3>
    <form id="step1-form" class="stepper-form">
      <label>Tipo de profesional *</label>
      <select id="prof-type" required>
        <option value="">Selecciona...</option>
        <option value="barbero" ${state.type === 'barbero' ? 'selected' : ''}>Barbero</option>
        <option value="estilista" ${state.type === 'estilista' ? 'selected' : ''}>Estilista</option>
        <option value="lashista" ${state.type === 'lashista' ? 'selected' : ''}>Lashista</option>
        <option value="colorista" ${state.type === 'colorista' ? 'selected' : ''}>Colorista</option>
        <option value="otros" ${state.type === 'otros' ? 'selected' : ''}>Otros</option>
      </select>
      <div class="field-error" id="error-type"></div>
      <label>Modalidad *</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" name="modality" value="independent" ${state.modality === 'independent' ? 'checked' : ''}> Independiente
        </label>
        <label class="radio-label">
          <input type="radio" name="modality" value="employed" ${state.modality === 'employed' ? 'checked' : ''}> Empleado
        </label>
      </div>
      <div class="field-error" id="error-modality"></div>
    </form>
  `;
}

function getStep2HTML() {
  if (state.modality === 'independent') {
    return `
      <h3>Profesional Independiente</h3>
      <form id="step2-form" class="stepper-form">
        <label>Nombre del local / Nombre profesional *</label>
        <input type="text" id="business-name" value="${escapeHtml(state.businessName)}" required />
        <div class="field-error" id="error-business-name"></div>
        <label>Dirección</label>
        <input type="text" id="address" value="${escapeHtml(state.address)}" />
        <div class="field-error" id="error-address"></div>
        <label class="checkbox-label">
          <input type="checkbox" id="work-from-home" ${state.workFromHome ? 'checked' : ''}> Trabajo a domicilio (sin local físico)
        </label>
      </form>
    `;
  } else {
    return `
      <h3>Profesional Empleado</h3>
      <form id="step2-form" class="stepper-form">
        <label>Buscar empresa existente</label>
        <div class="autocomplete-wrapper">
          <input type="text" id="company-search" placeholder="Nombre de la empresa..." autocomplete="off" />
          <ul id="company-suggestions" class="autocomplete-list hidden"></ul>
        </div>
        <p class="or-divider">o</p>
        <label>Registrar nueva empresa</label>
        <input type="text" id="new-company-name" value="${escapeHtml(state.companyName)}" placeholder="Nombre de la empresa" />
        <div class="field-error" id="error-company-name"></div>
        <input type="hidden" id="selected-company-id" value="${escapeHtml(state.companyId)}" />
        <p id="selected-company-display" class="selected-company"></p>
      </form>
    `;
  }
}

function getStep3HTML() {
  let summary = '<h3>Resumen del registro</h3><ul class="summary-list">';
  summary += `<li><strong>Tipo:</strong> ${escapeHtml(state.type)}</li>`;
  summary += `<li><strong>Modalidad:</strong> ${state.modality === 'independent' ? 'Independiente' : 'Empleado'}</li>`;
  if (state.modality === 'independent') {
    summary += `<li><strong>Nombre:</strong> ${escapeHtml(state.businessName)}</li>`;
    if (!state.workFromHome) {
      summary += `<li><strong>Dirección:</strong> ${escapeHtml(state.address)}</li>`;
    } else {
      summary += `<li><strong>Trabajo a domicilio:</strong> Sí</li>`;
    }
  } else {
    if (state.companyId) {
      summary += `<li><strong>Empresa:</strong> ${escapeHtml(state.companyName)} (ID: ${escapeHtml(state.companyId)})</li>`;
    } else {
      summary += `<li><strong>Empresa nueva:</strong> ${escapeHtml(state.companyName)}</li>`;
    }
    summary += `<li><strong>Solicitar vinculación:</strong> ${state.requestLink ? 'Sí' : 'No'}</li>`;
  }
  summary += '</ul>';
  return summary;
}

async function handleNext(container) {
  if (currentStep === 0) {
    if (!validateStep1()) return;
    currentStep++;
    renderStep(container);
  } else if (currentStep === 1) {
    if (!validateStep2()) return;
    currentStep++;
    renderStep(container);
  } else if (currentStep === 2) {
    await finalizeRegistration();
    showSuccess('Registro completado correctamente.');
    const { loginAsProfessional } = await import('../auth.mjs');
    loginAsProfessional('1234');
    window.location.hash = '/professional';
  }
}

function validateStep1() {
  const type = document.getElementById('prof-type').value;
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

function validateStep2() {
  if (state.modality === 'independent') {
    const name = document.getElementById('business-name').value.trim();
    const address = document.getElementById('address').value.trim();
    const workFromHome = document.getElementById('work-from-home').checked;
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
    const companyId = document.getElementById('selected-company-id').value;
    const newCompanyName = document.getElementById('new-company-name').value.trim();
    if (!companyId && !newCompanyName) {
      document.getElementById('error-company-name').textContent = 'Debes seleccionar una empresa o ingresar un nombre nuevo.';
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
      state.companyName = display ? display.textContent.replace('Empresa: ', '') : '';
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

function attachStep1Listeners() {}

function attachStep2Listeners() {
  if (state.modality === 'employed') {
    const searchInput = document.getElementById('company-search');
    const suggestionsList = document.getElementById('company-suggestions');
    const newCompanyInput = document.getElementById('new-company-name');
    
    searchInput.addEventListener('input', async (e) => {
      const query = e.target.value.trim();
      if (query.length < 2) {
        suggestionsList.classList.add('hidden');
        return;
      }
      const companies = await getCompaniesByName(query);
      suggestionsList.innerHTML = companies.length === 0
        ? '<li class="no-results">No se encontraron empresas</li>'
        : companies.map(c => `<li data-id="${escapeHtml(c.id)}">${escapeHtml(c.name)}</li>`).join('');
      suggestionsList.classList.remove('hidden');
    });

    suggestionsList.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li || !li.dataset.id) return;
      document.getElementById('selected-company-id').value = li.dataset.id;
      document.getElementById('selected-company-display').textContent = `Empresa: ${li.textContent}`;
      searchInput.value = li.textContent;
      suggestionsList.classList.add('hidden');
      newCompanyInput.value = '';
      document.getElementById('error-company-name').textContent = '';
    });

    newCompanyInput.addEventListener('input', () => {
      document.getElementById('selected-company-id').value = '';
      document.getElementById('selected-company-display').textContent = '';
      searchInput.value = '';
      suggestionsList.innerHTML = '';
      suggestionsList.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.autocomplete-wrapper')) {
        suggestionsList.classList.add('hidden');
      }
    });
  }
}