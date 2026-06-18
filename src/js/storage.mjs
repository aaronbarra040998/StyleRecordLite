/**
 * Client persistence layer.
 * Uses IndexedDB through the db.mjs module for greater capacity and robustness.
 * All operations are asynchronous and return promises.
 *
 * @module storage
 */

import * as db from './db.mjs';

/**
 * Loads all clients from the database.
 * @returns {Promise<Array>} Array of client objects
 */
export async function loadClients() {
  try {
    return await db.loadClients();
  } catch (error) {
    console.error('Error loading clients:', error);
    return [];
  }
}

/**
 * Saves a complete array of clients to the database.
 * Replaces all existing ones.
 * @param {Array} clients - Array of client objects
 * @returns {Promise<boolean>} true if saved successfully
 */
export async function saveClients(clients) {
  try {
    await db.saveClients(clients);
    return true;
  } catch (error) {
    console.error('Error saving clients:', error);
    return false;
  }
}

/**
 * Finds a client by phone number.
 * @param {string} phone - Exact phone number
 * @returns {Promise<Object|undefined>} Found client or undefined
 */
export async function getClientByPhone(phone) {
  const clients = await loadClients();
  return clients.find(c => c.phone === phone);
}

/**
 * Finds a client by their ID.
 * @param {string} id - Unique client identifier
 * @returns {Promise<Object|undefined>} Found client or undefined
 */
export async function getClientById(id) {
  // Could be optimized with db.getClientById(id), but for consistency we use loadClients.
  const clients = await loadClients();
  return clients.find(c => c.id === id);
}

/**
 * Adds a new client to the database.
 * @param {Object} client - Client object with unique id and other properties
 * @returns {Promise<boolean>} true if inserted successfully
 */
export async function addClient(client) {
  try {
    await db.addClient(client);
    return true;
  } catch (error) {
    console.error('Error adding client:', error);
    return false;
  }
}

/**
 * Updates the data of an existing client.
 * @param {string} id - ID of the client to modify
 * @param {Object} updatedData - Fields to update (e.g.: { name, phone })
 * @returns {Promise<boolean>} true if updated successfully
 */
export async function updateClient(id, updatedData) {
  try {
    const success = await db.updateClient(id, updatedData);
    if (!success) {
      console.warn(`Client with id ${id} not found for update.`);
    }
    return success;
  } catch (error) {
    console.error('Error updating client:', error);
    return false;
  }
}

/**
 * Deletes a client and all their associated services.
 * @param {string} id - ID of the client to delete
 * @returns {Promise<boolean>} true if deleted successfully
 */
export async function deleteClient(id) {
  try {
    await db.deleteClient(id);
    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    return false;
  }
}