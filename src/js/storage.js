/**
 * Módulo storage.js – Capa de abstracción para localStorage
 * Sigue el patrón visto en el curso (similar a utils.mjs)
 */

const STORAGE_KEYS = {
  VALIDATIONS: 'stylerecord_validations',   // historial de validaciones
  CLIENTS: 'stylerecord_clients',           // (para semana 6)
  SERVICES: 'stylerecord_services'
};

/**
 * Guarda un objeto en localStorage bajo una clave.
 * @param {string} key
 * @param {any} data
 */
export function setLocalStorage(key, data) {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
  }
}

/**
 * Recupera un objeto desde localStorage.
 * @param {string} key
 * @returns {any|null}
 */
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error leyendo desde localStorage:', error);
    return null;
  }
}

/**
 * Elimina una clave de localStorage.
 * @param {string} key
 */
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

/**
 * Añade un elemento a un array almacenado en localStorage (crea el array si no existe).
 * @param {string} key
 * @param {any} newItem
 * @returns {boolean} éxito
 */
export function pushToLocalStorage(key, newItem) {
  const existing = getLocalStorage(key) || [];
  if (!Array.isArray(existing)) return false;
  existing.push(newItem);
  setLocalStorage(key, existing);
  return true;
}

// Exportamos las claves para usarlas en otros módulos
export { STORAGE_KEYS };