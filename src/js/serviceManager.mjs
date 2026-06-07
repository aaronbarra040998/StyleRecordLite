import { loadClients, saveClients } from "./storage.mjs";
import { getBeforeAfterPlaceholders } from "./loremPicsum.mjs";

// Obtiene los servicios de un cliente por su ID
export function getServicesByClientId(clientId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  return client ? client.services : [];
}

// Agrega un servicio a un cliente
export function addService(clientId, service) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return false;

  // Asegurar que services sea un array
  if (!Array.isArray(client.services)) {
    client.services = [];
  }

  client.services.push(service);
  saveClients(clients);
  return true;
}

// Actualiza un servicio existente
export function updateService(clientId, serviceId, updatedService) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return false;

  const index = client.services.findIndex(s => s.id === serviceId);
  if (index === -1) return false;

  client.services[index] = { ...client.services[index], ...updatedService };
  saveClients(clients);
  return true;
}

// Elimina un servicio
export function deleteService(clientId, serviceId) {
  const clients = loadClients();
  const client = clients.find(c => c.id === clientId);
  if (!client) return false;

  client.services = client.services.filter(s => s.id !== serviceId);
  saveClients(clients);
  return true;
}

// Crea un objeto servicio nuevo con valores por defecto
export function createServiceTemplate(type = "corte", notes = "") {
  const { before, after } = getBeforeAfterPlaceholders?.() || {};
  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    clientId: null, // se asigna al guardar
    date: new Date().toISOString().slice(0, 10),
    type,
    notes,
    beforeImg: before || "",
    afterImg: after || "",
  };
}