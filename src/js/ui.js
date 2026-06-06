/**
 * Módulo ui.js – Funciones para manipular el DOM y mostrar feedback al usuario
 * Inspirado en utils.mjs del curso
 */

const resultDiv = document.getElementById('validationResult');
const phoneInput = document.getElementById('phone');
const validateBtn = document.getElementById('validateBtn');

/**
 * Muestra un spinner mientras se carga la validación.
 * @param {boolean} show - true: muestra spinner y deshabilita botón; false: oculta.
 */
export function showLoading(show) {
  if (!validateBtn) return;
  if (show) {
    validateBtn.disabled = true;
    const originalText = validateBtn.textContent;
    validateBtn.dataset.originalText = originalText;
    validateBtn.innerHTML = '<span class="spinner"></span> Validando...';
  } else {
    validateBtn.disabled = false;
    validateBtn.innerHTML = validateBtn.dataset.originalText || 'Validar con Numverify';
  }
}

/**
 * Muestra un mensaje de error en el área de resultados.
 * @param {string} message
 */
export function showError(message) {
  if (!resultDiv) return;
  resultDiv.innerHTML = `<div class="alert">⚠️ ${message}</div>`;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Muestra los datos de validación exitosa formateados.
 * @param {object} data - Objeto devuelto por Numverify
 */
export function showValidationResult(data) {
  if (!resultDiv) return;
  if (!data.valid) {
    resultDiv.innerHTML = `<div class="alert">❌ Número inválido o no encontrado.</div>`;
    return;
  }
  resultDiv.innerHTML = `
    <div style="background:#e8f5e9; padding:1rem; border-radius:0.75rem;">
      <strong>✅ Número válido</strong><br/>
      <strong>País:</strong> ${data.country_name} (${data.country_code})<br/>
      <strong>Localización:</strong> ${data.location || 'N/A'}<br/>
      <strong>Compañía:</strong> ${data.carrier || 'Desconocida'}<br/>
      <strong>Tipo:</strong> ${data.line_type || 'No especificado'}<br/>
      <small>Número internacional: ${data.international_format}</small>
    </div>
  `;
}

/**
 * Limpia el área de resultados (opcional).
 */
export function clearResult() {
  if (resultDiv) resultDiv.innerHTML = '';
}