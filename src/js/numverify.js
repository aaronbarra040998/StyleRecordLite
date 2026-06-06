/**
 * Módulo numverify.js – Comunicación con la API de validación telefónica
 * Uso de fetch, manejo de errores y variables de entorno (VITE_...)
 */

const BASE_URL = 'https://apilayer.net/api/validate';
const API_KEY = import.meta.env.VITE_NUMVERIFY_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ Falta la clave de API de Numverify. Crea un archivo .env con VITE_NUMVERIFY_API_KEY');
}

/**
 * Valida un número de teléfono usando Numverify.
 * @param {string} phoneNumber - Número con código de país (ej. +34987654321)
 * @returns {Promise<object>} - Objeto con los datos devueltos por la API.
 * @throws {Error} Si la API falla o la clave es inválida.
 */
export async function validatePhoneNumber(phoneNumber) {
  if (!API_KEY) {
    throw new Error('Numverify API key no configurada. Revisa tu archivo .env');
  }

  // Limpiar el número: eliminar espacios y signos no esenciales, pero mantener '+'
  const cleanNumber = phoneNumber.trim().replace(/\s/g, '');
  const url = `${BASE_URL}?access_key=${API_KEY}&number=${encodeURIComponent(cleanNumber)}&format=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    // La API devuelve { valid: boolean, ... } incluso si hay error (invalid)
    if (data.error) {
      throw new Error(`Numverify error: ${data.error.info || 'Consulta inválida'}`);
    }
    return data;
  } catch (error) {
    console.error('Error en validatePhoneNumber:', error);
    throw new Error(`No se pudo validar el número: ${error.message}`);
  }
}