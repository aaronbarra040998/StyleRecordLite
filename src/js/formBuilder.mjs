import { escapeHtml } from './utils.mjs';

export function buildNewClientForm() {
  return `
    <form id="new-client-form">
      <label>Nombre completo:</label>
      <input type="text" id="client-name" placeholder="María García" required />
      <div class="field-error" id="error-client-name"></div>
      <label>Teléfono (con código de país):</label>
      <input type="tel" id="client-phone" placeholder="+5491112345678" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validar y Guardar</button>
    </form>
  `;
}

export function buildEditClientForm(client) {
  return `
    <form id="edit-client-form">
      <label>Nombre:</label>
      <input type="text" id="edit-client-name" value="${escapeHtml(client.name)}" required />
      <div class="field-error" id="error-edit-client-name"></div>
      <label>Teléfono:</label>
      <input type="tel" id="edit-client-phone" value="${escapeHtml(client.phone)}" required />
      <div class="field-error" id="error-edit-client-phone"></div>
      <button type="submit">Guardar Cambios</button>
    </form>
  `;
}

export function buildNewServiceForm(beforeImg, afterImg, afterLateralImg) {
  return `
    <form id="new-service-form">
      <label>Tipo de servicio:</label>
      <select id="service-type" required>
        <option value="">Selecciona...</option>
        <option value="corte">Corte</option>
        <option value="tinte">Tinte</option>
        <option value="tratamiento">Tratamiento</option>
        <option value="peinado">Peinado</option>
        <option value="otros">Otros</option>
      </select>
      <div class="field-error" id="error-service-type"></div>
      <label>Fecha:</label>
      <input type="date" id="service-date" value="${new Date().toISOString().slice(0,10)}" required />
      <div class="field-error" id="error-service-date"></div>
      <label>Notas:</label>
      <textarea id="service-notes" rows="3"></textarea>
      <div class="image-preview-grid">
        <div><small>Antes</small><img src="${escapeHtml(beforeImg)}" id="preview-before" /></div>
        <div><small>Después frontal</small><img src="${escapeHtml(afterImg)}" id="preview-after-frontal" /></div>
        <div><small>Después lateral</small><img src="${escapeHtml(afterLateralImg)}" id="preview-after-lateral" /></div>
      </div>
      <button type="button" id="btn-regenerate-images">Generar otras imágenes</button>
      <button type="submit">Guardar Servicio</button>
    </form>
  `;
}

export function buildEditServiceForm(service) {
  const typeOptions = ['corte', 'tinte', 'tratamiento', 'peinado', 'otros']
    .map(t => `<option value="${t}" ${service.type === t ? 'selected' : ''}>${t.charAt(0).toUpperCase() + t.slice(1)}</option>`)
    .join('');
  return `
    <form id="edit-service-form">
      <label>Tipo:</label>
      <select id="edit-service-type" required>${typeOptions}</select>
      <div class="field-error" id="error-edit-service-type"></div>
      <label>Fecha:</label>
      <input type="date" id="edit-service-date" value="${escapeHtml(service.date)}" required />
      <div class="field-error" id="error-edit-service-date"></div>
      <label>Notas:</label>
      <textarea id="edit-service-notes" rows="3">${escapeHtml(service.notes)}</textarea>
      <button type="submit">Guardar Cambios</button>
    </form>
  `;
}

export function buildShareProfileForm(shareUrl) {
  return `
    <p>Envía este enlace a tu nuevo profesional. <strong>Válido por 24 horas.</strong></p>
    <div style="display:flex; gap:0.5rem; margin:1rem 0;">
      <input type="text" id="share-link" value="${escapeHtml(shareUrl)}" readonly style="flex:1;" />
      <button id="btn-copy-link"><i class="fas fa-copy"></i> Copiar</button>
    </div>
    <small>El profesional podrá ver tu historial de servicios sin poder editarlo.</small>
  `;
}