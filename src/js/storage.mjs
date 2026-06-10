/**
 * Capa de persistencia de clientes.
 * Utiliza IndexedDB a través del módulo db.mjs para mayor capacidad y robustez.
 * Todas las operaciones son asíncronas y devuelven promesas.
 *
 * @module storage
 */

import * as db from './db.mjs';

/**
 * Carga todos los clientes desde la base de datos.
 * @returns {Promise<Array>} Array de objetos cliente
 */
export async function loadClients() {
  try {
    return await db.loadClients();
  } catch (error) {
    console.error('Error al cargar clientes:', error);
    return [];
  }
}

/**
 * Guarda un array completo de clientes en la base de datos.
 * Reemplaza todos los existentes.
 * @param {Array} clients - Array de objetos cliente
 * @returns {Promise<boolean>} true si se guardó correctamente
 */
export async function saveClients(clients) {
  try {
    await db.saveClients(clients);
    return true;
  } catch (error) {
    console.error('Error al guardar clientes:', error);
    return false;
  }
}

/**
 * Busca un cliente por número de teléfono.
 * @param {string} phone - Número de teléfono exacto
 * @returns {Promise<Object|undefined>} Cliente encontrado o undefined
 */
export async function getClientByPhone(phone) {
  const clients = await loadClients();
  return clients.find(c => c.phone === phone);
}

/**
 * Busca un cliente por su ID.
 * @param {string} id - Identificador único del cliente
 * @returns {Promise<Object|undefined>} Cliente encontrado o undefined
 */
export async function getClientById(id) {
  // Podríamos optimizar con db.getClientById(id), pero por consistencia usamos loadClients.
  const clients = await loadClients();
  return clients.find(c => c.id === id);
}

/**
 * Agrega un nuevo cliente a la base de datos.
 * @param {Object} client - Objeto cliente con id único y demás propiedades
 * @returns {Promise<boolean>} true si se insertó correctamente
 */
export async function addClient(client) {
  try {
    await db.addClient(client);
    return true;
  } catch (error) {
    console.error('Error al agregar cliente:', error);
    return false;
  }
}

/**
 * Actualiza los datos de un cliente existente.
 * @param {string} id - ID del cliente a modificar
 * @param {Object} updatedData - Campos a actualizar (ej: { name, phone })
 * @returns {Promise<boolean>} true si se actualizó correctamente
 */
export async function updateClient(id, updatedData) {
  try {
    const success = await db.updateClient(id, updatedData);
    if (!success) {
      console.warn(`Cliente con id ${id} no encontrado para actualizar.`);
    }
    return success;
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    return false;
  }
}

/**
 * Elimina un cliente y todos sus servicios asociados.
 * @param {string} id - ID del cliente a eliminar
 * @returns {Promise<boolean>} true si se eliminó correctamente
 */
export async function deleteClient(id) {
  try {
    await db.deleteClient(id);
    return true;
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    return false;
  }
}