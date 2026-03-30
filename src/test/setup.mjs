import '@testing-library/jest-dom';
import { vi } from 'vitest';

const createMockLocalStorage = () => {
  const store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i) => Object.keys(store)[i] || null,
  };
};

const mockLocalStorage = createMockLocalStorage();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

export const mockDoc = vi.fn();
export const mockSetDoc = vi.fn();
export const mockGetDoc = vi.fn();
export const mockGetDocs = vi.fn();
export const mockCollection = vi.fn();
export const mockAddDoc = vi.fn();
export const mockUpdateDoc = vi.fn();
export const mockQuery = vi.fn();
export const mockWhere = vi.fn();
export const mockOrderBy = vi.fn();
export const mockServerTimestamp = vi.fn(() => new Date());
export const mockDocRef = { id: 'test-doc-id' };

export const db = {};
export const auth = { currentUser: null };