/**
 * main.js – Punto de entrada de la aplicación (Semana 5)
 * Orquesta los módulos de storage, validación telefónica y UI.
 */

import { validatePhoneNumber } from './numverify.js';
import { setLocalStorage, getLocalStorage, pushToLocalStorage, STORAGE_KEYS } from './storage.js';
import { showLoading, showError, showValidationResult, clearResult } from './ui.js';

// Elementos del DOM
const phoneForm = document.getElementById('phoneForm');
const phoneInput = document.getElementById('phone');
const saveTestBtn = document.getElementById('saveTestBtn');
const loadTestBtn = document.getElementById('loadTestBtn');
const storageOutput = document.getElementById('storageOutput');

// ---------- Validación de teléfono con Numverify ----------
phoneForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const phoneNumber = phoneInput.value.trim();
  if (!phoneNumber) {
    showError('Por favor ingresa un número de teléfono.');
    return;
  }

  clearResult();
  showLoading(true);

  try {
    const result = await validatePhoneNumber(phoneNumber);
    showValidationResult(result);

    // Guardar la validación en localStorage (historial)
    const validationRecord = {
      phone: phoneNumber,
      timestamp: new Date().toISOString(),
      valid: result.valid,
      country: result.country_name,
      carrier: result.carrier,
    };
    pushToLocalStorage(STORAGE_KEYS.VALIDATIONS, validationRecord);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
});

// ---------- Demostración de localStorage (storage.js) ----------
saveTestBtn?.addEventListener('click', () => {
  const lastValidation = getLocalStorage(STORAGE_KEYS.VALIDATIONS);
  const testData = {
    savedAt: new Date().toISOString(),
    message: 'Esto es una prueba de almacenamiento local',
    ultimaValidacion: lastValidation ? lastValidation[lastValidation.length - 1] : null,
  };
  setLocalStorage('demo_test', testData);
  storageOutput.textContent = JSON.stringify(testData, null, 2);
  alert('Datos guardados en localStorage (clave: demo_test)');
});

loadTestBtn?.addEventListener('click', () => {
  const data = getLocalStorage('demo_test');
  if (data) {
    storageOutput.textContent = JSON.stringify(data, null, 2);
  } else {
    storageOutput.textContent = '(No hay datos guardados. Primero haz clic en "Guardar")';
  }
});

// Cargar al inicio cualquier dato previo para mostrar
const initialDemo = getLocalStorage('demo_test');
if (initialDemo && storageOutput) {
  storageOutput.textContent = JSON.stringify(initialDemo, null, 2);
}

console.log('✅ StyleRecord Lite – Semana 5 lista');