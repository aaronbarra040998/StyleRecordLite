import { describe, it, expect, beforeEach } from 'vitest';
import { loadClients, saveClients, addClient, updateClient, deleteClient, getClientById, getClientByPhone } from '../storage.mjs';

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  it('loadClients returns empty array initially', () => {
    expect(loadClients()).toEqual([]);
  });

  it('addClient adds a client', () => {
    const client = { id: '1', name: 'Ana', phone: '123', services: [] };
    addClient(client);
    expect(loadClients()).toHaveLength(1);
  });

  it('updateClient updates existing client', () => {
    const client = { id: '1', name: 'Ana', phone: '123' };
    addClient(client);
    updateClient('1', { name: 'María' });
    expect(getClientById('1').name).toBe('María');
  });

  it('deleteClient removes client', () => {
    addClient({ id: '1', name: 'A' });
    deleteClient('1');
    expect(loadClients()).toHaveLength(0);
  });

  it('getClientByPhone returns correct client', () => {
    addClient({ id: '2', name: 'B', phone: '456' });
    expect(getClientByPhone('456').name).toBe('B');
  });
});
