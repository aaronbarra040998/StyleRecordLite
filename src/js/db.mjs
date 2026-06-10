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
  try {
    const db = await getDB();
    await db.add('clients', client);
  } catch (error) {
    console.error('Error al agregar cliente:', error);
    throw error;   // para que storage.mjs lo capture
  }
}

export async function updateClient(id, updatedData) {
  try {
    const db = await getDB();
    const client = await db.get('clients', id);
    if (!client) return false;
    Object.assign(client, updatedData);
    await db.put('clients', client);
    return true;
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    return false;
  }
}

export async function deleteClient(id) {
  try {
    const db = await getDB();
    await db.delete('clients', id);
    return true;
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    return false;
  }
}

export async function getClientById(id) {
  const db = await getDB();
  return db.get('clients', id);
}