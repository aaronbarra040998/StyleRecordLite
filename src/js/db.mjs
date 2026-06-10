import { openDB } from 'idb';

const DB_NAME = 'stylerecord-db';
const DB_VERSION = 1;

let dbPromise;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('clients')) {
          db.createObjectStore('clients', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function loadClients() {
  const db = await getDB();
  return db.getAll('clients');
}

export async function saveClients(clients) {
  const db = await getDB();
  const tx = db.transaction('clients', 'readwrite');
  await tx.store.clear();
  for (const client of clients) {
    await tx.store.put(client);
  }
  await tx.done;
}

export async function addClient(client) {
  const db = await getDB();
  await db.add('clients', client);
}

export async function updateClient(id, updatedData) {
  const db = await getDB();
  const client = await db.get('clients', id);
  if (!client) return false;
  Object.assign(client, updatedData);
  await db.put('clients', client);
  return true;
}

export async function deleteClient(id) {
  const db = await getDB();
  await db.delete('clients', id);
}

// Nuevo: obtener un cliente por ID directamente
export async function getClientById(id) {
  const db = await getDB();
  return db.get('clients', id);
}