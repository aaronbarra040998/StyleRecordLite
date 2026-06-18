import { loadClients, saveClients } from "./storage.mjs";

/**
 * Retrieves a client's services by their ID.
 * @param {string} clientId
 * @returns {Promise<Array>}
 */
export async function getServicesByClientId(clientId) {
  const clients = await loadClients();
  const client = clients.find(c => c.id === clientId);
  return client ? client.services : [];
}

/**
 * Adds a service to a client.
 * @param {string} clientId
 * @param {Object} service
 * @returns {Promise<boolean>}
 */
export async function addService(clientId, service) {
  const clients = await loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return false;
  if (!Array.isArray(client.services)) {
    client.services = [];
  }
  client.services.push(service);
  await saveClients(clients);
  return true;
}

/**
 * Updates an existing service.
 * @param {string} clientId
 * @param {string} serviceId
 * @param {Object} updatedService
 * @returns {Promise<boolean>}
 */
export async function updateService(clientId, serviceId, updatedService) {
  const clients = await loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return false;
  const index = client.services.findIndex(s => s.id === serviceId);
  if (index === -1) return false;
  client.services[index] = { ...client.services[index], ...updatedService };
  await saveClients(clients);
  return true;
}

/**
 * Deletes a service.
 * @param {string} clientId
 * @param {string} serviceId
 * @returns {Promise<boolean>}
 */
export async function deleteService(clientId, serviceId) {
  const clients = await loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return false;
  client.services = client.services.filter(s => s.id !== serviceId);
  await saveClients(clients);
  return true;
}