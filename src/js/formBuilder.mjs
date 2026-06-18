import { escapeHtml } from './utils.mjs';

export function buildNewClientForm() {
  return `
    <form id="new-client-form">
      <label>Full name:</label>
      <input type="text" id="client-name" placeholder="Full name" required />
      <div class="field-error" id="error-client-name"></div>
      <label>Phone (with country code):</label>
      <input type="tel" id="client-phone" placeholder="+5491112345678" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validate and Save</button>
    </form>
  `;
}

export function buildEditClientForm(client) {
  return `
    <form id="edit-client-form">
      <label>Name:</label>
      <input type="text" id="edit-client-name" value="${escapeHtml(client.name)}" required />
      <div class="field-error" id="error-edit-client-name"></div>
      <label>Phone:</label>
      <input type="tel" id="edit-client-phone" value="${escapeHtml(client.phone)}" required />
      <div class="field-error" id="error-edit-client-phone"></div>
      <button type="submit">Save Changes</button>
    </form>
  `;
}

export function buildNewServiceForm(beforeImg, afterImg, afterLateralImg) {
  return `
    <form id="new-service-form">
      <label>Service type:</label>
      <select id="service-type" required>
        <option value="">Select...</option>
        <option value="corte">Cut</option>
        <option value="tinte">Color</option>
        <option value="tratamiento">Treatment</option>
        <option value="peinado">Styling</option>
        <option value="otros">Other</option>
      </select>
      <div class="field-error" id="error-service-type"></div>
      <label>Date:</label>
      <input type="date" id="service-date" value="${new Date().toISOString().slice(0,10)}" required />
      <div class="field-error" id="error-service-date"></div>
      <label>Notes:</label>
      <textarea id="service-notes" rows="3"></textarea>
      <div class="image-preview-grid">
        <div><small>Before</small><img src="${escapeHtml(beforeImg)}" id="preview-before" /></div>
        <div><small>After front</small><img src="${escapeHtml(afterImg)}" id="preview-after-frontal" /></div>
        <div><small>After side</small><img src="${escapeHtml(afterLateralImg)}" id="preview-after-lateral" /></div>
      </div>
      <button type="button" id="btn-regenerate-images">Generate other images</button>
      <button type="submit">Save Service</button>
    </form>
  `;
}

export function buildEditServiceForm(service) {
  // Map internal values to English display labels
  const typeLabels = {
    corte: 'Cut',
    tinte: 'Color',
    tratamiento: 'Treatment',
    peinado: 'Styling',
    otros: 'Other'
  };
  const typeOptions = ['corte', 'tinte', 'tratamiento', 'peinado', 'otros']
    .map(t => `<option value="${t}" ${service.type === t ? 'selected' : ''}>${typeLabels[t]}</option>`)
    .join('');
  return `
    <form id="edit-service-form">
      <label>Type:</label>
      <select id="edit-service-type" required>${typeOptions}</select>
      <div class="field-error" id="error-edit-service-type"></div>
      <label>Date:</label>
      <input type="date" id="edit-service-date" value="${escapeHtml(service.date)}" required />
      <div class="field-error" id="error-edit-service-date"></div>
      <label>Notes:</label>
      <textarea id="edit-service-notes" rows="3">${escapeHtml(service.notes)}</textarea>
      <button type="submit">Save Changes</button>
    </form>
  `;
}

export function buildShareProfileForm(shareUrl) {
  return `
    <p>Send this link to your new professional. <strong>Valid for 24 hours.</strong></p>
    <div style="display:flex; gap:0.5rem; margin:1rem 0;">
      <input type="text" id="share-link" value="${escapeHtml(shareUrl)}" readonly style="flex:1;" />
      <button id="btn-copy-link"><i class="fas fa-copy"></i> Copy</button>
    </div>
    <small>The professional will be able to view your service history without editing it.</small>
  `;
}