import { openDB } from 'idb';

const DB_NAME = 'stylerecord-db';
const DB_VERSION = 2;

let dbPromise;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Store de clientes (ya existía)
        if (!db.objectStoreNames.contains('clients')) {
          db.createObjectStore('clients', { keyPath: 'id' });
        }
        // Nuevos stores para la fase 7
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains('professionals')) {
            db.createObjectStore('professionals', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('companies')) {
            const companyStore = db.createObjectStore('companies', { keyPath: 'id' });
            companyStore.createIndex('name', 'name', { unique: false });
          }
          if (!db.objectStoreNames.contains('linkRequests')) {
            const linkStore = db.createObjectStore('linkRequests', { keyPath: 'id' });
            linkStore.createIndex('professionalId', 'professionalId', { unique: false });
            linkStore.createIndex('companyId', 'companyId', { unique: false });
          }
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

export async function getClientById(id) {
  const db = await getDB();
  return db.get('clients', id);
}

// ─── Nuevas funciones para profesionales y empresas ───

export async function saveProfessional(professional) {
  const db = await getDB();
  await db.put('professionals', professional);
}

export async function getProfessionalById(id) {
  const db = await getDB();
  return db.get('professionals', id);
}

export async function saveCompany(company) {
  const db = await getDB();
  await db.put('companies', company);
}

export async function getCompanyById(id) {
  const db = await getDB();
  return db.get('companies', id);
}

export async function getAllCompanies() {
  const db = await getDB();
  return db.getAll('companies');
}

export async function getCompaniesByName(name) {
  const db = await getDB();
  const index = db.transaction('companies', 'readonly').store.index('name');
  const range = IDBKeyRange.bound(name, name + '\uffff', false, false);
  return index.getAll(range);
}

export async function saveLinkRequest(request) {
  const db = await getDB();
  await db.add('linkRequests', request);
}

export async function getLinkRequestsByProfessional(professionalId) {
  const db = await getDB();
  const index = db.transaction('linkRequests', 'readonly').store.index('professionalId');
  return index.getAll(professionalId);
}

export async function getLinkRequestsByCompany(companyId) {
  const db = await getDB();
  const index = db.transaction('linkRequests', 'readonly').store.index('companyId');
  return index.getAll(companyId);
}