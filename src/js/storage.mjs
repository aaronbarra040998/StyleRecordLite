// Clave única para los clientes
const CLIENTS_KEY = "sr-clients";

export function loadClients() {
  const data = localStorage.getItem(CLIENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveClients(clients) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

// Funciones auxiliares específicas
export function getClientByPhone(phone) {
  const clients = loadClients();
  return clients.find(c => c.phone === phone);
}

export function addClient(client) {
  const clients = loadClients();
  clients.push(client);
  saveClients(clients);
}

export function updateClient(updatedClient) {
  const clients = loadClients();
  const index = clients.findIndex(c => c.id === updatedClient.id);
  if (index !== -1) {
    clients[index] = updatedClient;
    saveClients(clients);
  }
}

export function deleteClient(id) {
  const clients = loadClients().filter(c => c.id !== id);
  saveClients(clients);
}