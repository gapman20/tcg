// API Service Placeholder
// This file provides a structured way to add a real backend API in the future
//
// Usage:
// 1. Replace the localStorage implementations with API calls
// 2. Keep the same function signatures for easy migration
// 3. Add authentication headers as needed

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper for making API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

// ─── Card API ────────────────────────────────────────────────────────────────
export const cardApi = {
  getAll: async () => {
    // Future: GET /cards
    // For now, use localStorage
    return JSON.parse(localStorage.getItem('tcg_cards') || '[]');
  },

  getById: async (id) => {
    // Future: GET /cards/:id
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    return cards.find(c => c.id === id);
  },

  create: async (card) => {
    // Future: POST /cards
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    const newCard = { ...card, id: `card-${Date.now()}` };
    cards.unshift(newCard);
    localStorage.setItem('tcg_cards', JSON.stringify(cards));
    return newCard;
  },

  update: async (id, updates) => {
    // Future: PUT /cards/:id
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    const index = cards.findIndex(c => c.id === id);
    if (index !== -1) {
      cards[index] = { ...cards[index], ...updates };
      localStorage.setItem('tcg_cards', JSON.stringify(cards));
      return cards[index];
    }
    return null;
  },

  delete: async (id) => {
    // Future: DELETE /cards/:id
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    const filtered = cards.filter(c => c.id !== id);
    localStorage.setItem('tcg_cards', JSON.stringify(filtered));
    return true;
  },
};

// ─── Order API ───────────────────────────────────────────────────────────────
export const orderApi = {
  getAll: async () => {
    // Future: GET /orders
    return JSON.parse(localStorage.getItem('tcg_orders') || '[]');
  },

  create: async (orderData) => {
    // Future: POST /orders
    const orders = JSON.parse(localStorage.getItem('tcg_orders') || '[]');
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    localStorage.setItem('tcg_orders', JSON.stringify(orders));
    return newOrder;
  },

  updateStatus: async (id, status) => {
    // Future: PUT /orders/:id/status
    const orders = JSON.parse(localStorage.getItem('tcg_orders') || '[]');
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      localStorage.setItem('tcg_orders', JSON.stringify(orders));
      return orders[index];
    }
    return null;
  },

  lookup: async (orderId, email) => {
    // Future: GET /orders/lookup?orderId=X&email=Y
    const orders = JSON.parse(localStorage.getItem('tcg_orders') || '[]');
    return orders.find(o => o.id === orderId && o.email?.toLowerCase() === email.toLowerCase());
  },
};

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  login: async (email, password) => {
    // Future: POST /auth/login
    // Simple local auth for now
    const storedPass = localStorage.getItem('admin_password') || 'admin123';
    if (password === storedPass) {
      localStorage.setItem('auth_token', 'local-token');
      localStorage.setItem('is_authenticated', 'true');
      return { success: true, user: { email } };
    }
    return { success: false };
  },

  logout: async () => {
    // Future: POST /auth/logout
    localStorage.removeItem('auth_token');
    localStorage.setItem('is_authenticated', 'false');
    return true;
  },

  changePassword: async (oldPass, newPass) => {
    // Future: PUT /auth/password
    const storedPass = localStorage.getItem('admin_password') || 'admin123';
    if (oldPass === storedPass) {
      localStorage.setItem('admin_password', newPass);
      return true;
    }
    return false;
  },

  isAuthenticated: () => {
    return localStorage.getItem('is_authenticated') === 'true';
  },
};

// ─── Site Content API ────────────────────────────────────────────────────────
export const siteApi = {
  getContent: async () => {
    // Future: GET /site/content
    // Returns site configuration
    return null; // Use localStorage fallback in context
  },

  saveContent: async (content) => {
    // Future: PUT /site/content
    localStorage.setItem('site_content_v1', JSON.stringify(content));
    return true;
  },
};

// ─── Image Upload API ─────────────────────────────────────────────────────────
export const imageApi = {
  upload: async (file, folder = 'misc') => {
    // Future: POST /upload
    // For now, convert to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};

export default {
  cards: cardApi,
  orders: orderApi,
  auth: authApi,
  site: siteApi,
  images: imageApi,
};
