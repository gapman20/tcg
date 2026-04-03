// API Service
// Configura VITE_USE_API en .env para cambiar entre API real y localStorage

const USE_API = import.meta.env.VITE_USE_API === 'true';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

console.log(`🔌 API Mode: ${USE_API ? 'REAL API' : 'localStorage (demo)'} | URL: ${API_BASE_URL}`);

// Helper for making API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

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

// Normalize game field from object to string
export const normalizeGame = (item) => {
  if (!item) return item;
  const normalized = { ...item };
  if (item.game && typeof item.game === 'object') {
    normalized.game = item.game.name;
    normalized.gameDisplayName = item.game.displayName;
  }
  return normalized;
};

// Helper to get game as string (handles both object and string formats)
export const getGameValue = (game) => {
  if (!game) return '';
  if (typeof game === 'string') return game;
  if (typeof game === 'object') return game.name || '';
  return String(game);
};

// ─── Card API ────────────────────────────────────────────────────────────────
export const cardApi = {
  getAll: async () => {
    if (USE_API) {
      const data = await apiRequest('/cards');
      return (data.cards || []).map(normalizeGame);
    }
    return JSON.parse(localStorage.getItem('tcg_cards') || '[]');
  },

  getById: async (id) => {
    if (USE_API) {
      const card = await apiRequest(`/cards/${id}`);
      return normalizeGame(card);
    }
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    return cards.find(c => c.id === id);
  },

  create: async (card) => {
    if (USE_API) {
      return await apiRequest('/cards', { method: 'POST', body: JSON.stringify(card) });
    }
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    const newCard = { ...card, id: `card-${Date.now()}` };
    cards.unshift(newCard);
    localStorage.setItem('tcg_cards', JSON.stringify(cards));
    return newCard;
  },

  update: async (id, updates) => {
    if (USE_API) {
      return await apiRequest(`/cards/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    }
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
    if (USE_API) {
      return await apiRequest(`/cards/${id}`, { method: 'DELETE' });
    }
    const cards = JSON.parse(localStorage.getItem('tcg_cards') || '[]');
    const filtered = cards.filter(c => c.id !== id);
    localStorage.setItem('tcg_cards', JSON.stringify(filtered));
    return true;
  },
};

// ─── Product API (Sellados) ────────────────────────────────────────────────────────
export const productApi = {
  getAll: async () => {
    if (USE_API) {
      const data = await apiRequest('/products');
      return (data.products || []).map(normalizeGame);
    }
    return JSON.parse(localStorage.getItem('tcg_sellados') || '[]');
  },

  getById: async (id) => {
    if (USE_API) {
      const product = await apiRequest(`/products/${id}`);
      return normalizeGame(product);
    }
    const products = JSON.parse(localStorage.getItem('tcg_sellados') || '[]');
    return products.find(p => p.id === id);
  },

  create: async (product) => {
    if (USE_API) {
      return await apiRequest('/products', { method: 'POST', body: JSON.stringify(product) });
    }
    const products = JSON.parse(localStorage.getItem('tcg_sellados') || '[]');
    const newProduct = { ...product, id: `prod-${Date.now()}` };
    products.unshift(newProduct);
    localStorage.setItem('tcg_sellados', JSON.stringify(products));
    return newProduct;
  },

  update: async (id, updates) => {
    if (USE_API) {
      return await apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    }
    const products = JSON.parse(localStorage.getItem('tcg_sellados') || '[]');
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      localStorage.setItem('tcg_sellados', JSON.stringify(products));
      return products[index];
    }
    return null;
  },

  delete: async (id) => {
    if (USE_API) {
      return await apiRequest(`/products/${id}`, { method: 'DELETE' });
    }
    const products = JSON.parse(localStorage.getItem('tcg_sellados') || '[]');
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('tcg_sellados', JSON.stringify(filtered));
    return true;
  },
};

// ─── Cart API ────────────────────────────────────────────────────────────────
export const cartApi = {
  get: () => {
    return JSON.parse(localStorage.getItem('tcg_cart') || '[]');
  },

  save: (items) => {
    localStorage.setItem('tcg_cart', JSON.stringify(items));
    return items;
  },

  clear: () => {
    localStorage.removeItem('tcg_cart');
    return true;
  },
};

// ─── Order API ───────────────────────────────────────────────────────────────
export const orderApi = {
  getAll: async () => {
    if (USE_API) {
      const data = await apiRequest('/orders');
      return data.orders || [];
    }
    return JSON.parse(localStorage.getItem('tcg_orders') || '[]');
  },

  getMyOrders: async () => {
    if (USE_API) {
      const data = await apiRequest('/orders/my-orders');
      return data || [];
    }
    return JSON.parse(localStorage.getItem('tcg_orders') || '[]');
  },

  getById: async (id) => {
    if (USE_API) {
      return await apiRequest(`/orders/${id}`);
    }
    const orders = JSON.parse(localStorage.getItem('tcg_orders') || '[]');
    return orders.find(o => o.id === id);
  },

  create: async (orderData) => {
    if (USE_API) {
      return await apiRequest('/orders', { method: 'POST', body: JSON.stringify(orderData) });
    }
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
    if (USE_API) {
      return await apiRequest(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    }
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
    if (USE_API) {
      const order = await apiRequest(`/orders/${orderId}`);
      if (order.customerEmail?.toLowerCase() === email.toLowerCase()) {
        return order;
      }
      return null;
    }
    const orders = JSON.parse(localStorage.getItem('tcg_orders') || '[]');
    return orders.find(o => o.id === orderId && o.customerEmail?.toLowerCase() === email.toLowerCase());
  },
};

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  login: async (email, password) => {
    if (USE_API) {
      const data = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('is_authenticated', 'true');
        localStorage.setItem('tcg_user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false };
    }
    const storedPass = localStorage.getItem('admin_password') || 'admin123';
    if (password === storedPass) {
      localStorage.setItem('auth_token', 'local-token');
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('tcg_user', JSON.stringify({ email, name: 'Admin' }));
      return { success: true, user: { email, name: 'Admin' } };
    }
    return { success: false };
  },

  adminLogin: async (email, password) => {
    if (USE_API) {
      const data = await apiRequest('/auth/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('is_authenticated', 'true');
        localStorage.setItem('tcg_user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false };
    }
    return authApi.login(email, password);
  },

  register: async (email, password, name) => {
    if (USE_API) {
      const data = await apiRequest('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name }) });
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('is_authenticated', 'true');
        localStorage.setItem('tcg_user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false };
    }
    return { success: false };
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.setItem('is_authenticated', 'false');
    localStorage.removeItem('tcg_user');
    return true;
  },

  changePassword: async (oldPass, newPass) => {
    if (USE_API) {
      const data = await apiRequest('/users/password', { method: 'PUT', body: JSON.stringify({ currentPassword: oldPass, newPassword: newPass }) });
      return data.message === 'Password updated successfully';
    }
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

  getUser: () => {
    const user = localStorage.getItem('tcg_user');
    return user ? JSON.parse(user) : null;
  },
};

// ─── Wishlist API ──────────────────────────────────────────────────────────────
export const wishlistApi = {
  get: () => {
    return JSON.parse(localStorage.getItem('tcg_wishlist') || '[]');
  },

  add: (itemId) => {
    const wishlist = JSON.parse(localStorage.getItem('tcg_wishlist') || '[]');
    if (!wishlist.includes(itemId)) {
      wishlist.push(itemId);
      localStorage.setItem('tcg_wishlist', JSON.stringify(wishlist));
    }
    return wishlist;
  },

  remove: (itemId) => {
    const wishlist = JSON.parse(localStorage.getItem('tcg_wishlist') || '[]');
    const filtered = wishlist.filter(id => id !== itemId);
    localStorage.setItem('tcg_wishlist', JSON.stringify(filtered));
    return filtered;
  },

  clear: () => {
    localStorage.removeItem('tcg_wishlist');
    return true;
  },
};

// ─── Game API ─────────────────────────────────────────────────────────────────
export const gameApi = {
  getAll: async () => {
    if (USE_API) {
      return await apiRequest('/games');
    }
    return JSON.parse(localStorage.getItem('tcg_games') || '[]');
  },
};

// ─── Site Content API ────────────────────────────────────────────────────────
export const siteApi = {
  getContent: async () => {
    if (USE_API) {
      return await apiRequest('/site/config');
    }
    return null;
  },

  saveContent: async (content) => {
    if (USE_API) {
      return await apiRequest('/site/config', { method: 'PUT', body: JSON.stringify(content) });
    }
    localStorage.setItem('site_content_v1', JSON.stringify(content));
    return true;
  },
};

// ─── Image Upload API ─────────────────────────────────────────────────────────
export const imageApi = {
  upload: async (file, folder = 'misc') => {
    if (USE_API) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      return await apiRequest('/upload', { method: 'POST', body: formData, headers: {} });
    }
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
  products: productApi,
  cart: cartApi,
  orders: orderApi,
  auth: authApi,
  wishlist: wishlistApi,
  games: gameApi,
  site: siteApi,
  images: imageApi,
};
