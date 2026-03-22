const TCGPLAYER_API_URL = 'https://api.tcgplayer.com/v1.39.0';
const TOKEN_URL = 'https://api.tcgplayer.com/token';

let cachedToken = null;
let tokenExpiresAt = 0;

export async function getBearerToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  const publicKey = import.meta.env.VITE_TCG_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_TCG_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error('TCGplayer API keys not configured. Add VITE_TCG_PUBLIC_KEY and VITE_TCG_PRIVATE_KEY to .env');
  }

  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: publicKey,
        client_secret: privateKey,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status}`);
    }

    const data = await response.json();
    
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in * 1000);
    
    return cachedToken;
  } catch (error) {
    console.error('TCGplayer Auth Error:', error);
    throw error;
  }
}

async function apiRequest(endpoint, options = {}) {
  const token = await getBearerToken();
  
  const response = await fetch(`${TCGPLAYER_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`TCGplayer API Error: ${response.status}`);
  }

  return response.json();
}

export const tcgplayerApi = {
  getCategories: async () => {
    return apiRequest('/catalog/categories');
  },

  getCategoryGroups: async (categoryId) => {
    return apiRequest(`/catalog/categories/${categoryId}/groups`);
  },

  getProducts: async (categoryId, options = {}) => {
    const params = new URLSearchParams({
      categoryId,
      limit: options.limit || 100,
      offset: options.offset || 0,
      ...options,
    });
    return apiRequest(`/catalog/products?${params}`);
  },

  searchProducts: async (query, options = {}) => {
    const params = new URLSearchParams({
      q: query,
      categoryId: options.categoryId || '',
      limit: options.limit || 20,
      ...options,
    });
    return apiRequest(`/catalog/products?${params}`);
  },

  getProductDetails: async (productId) => {
    return apiRequest(`/catalog/products/${productId}`);
  },

  getProductPrices: async (productIds) => {
    if (!Array.isArray(productIds)) {
      productIds = [productIds];
    }
    const body = JSON.stringify({ productIds });
    return apiRequest('/pricing/product', {
      method: 'POST',
      body,
    });
  },

  getProductsWithPrices: async (categoryId, options = {}) => {
    const productsResponse = await tcgplayerApi.getProducts(categoryId, {
      limit: options.limit || 50,
      ...options,
    });

    if (productsResponse.Results && productsResponse.Results.length > 0) {
      const productIds = productsResponse.Results.map(p => p.productId);
      
      try {
        const pricesResponse = await tcgplayerApi.getProductPrices(productIds);
        
        const pricesMap = {};
        if (pricesResponse.Results) {
          pricesResponse.Results.forEach(price => {
            pricesMap[price.productId] = price;
          });
        }

        return productsResponse.Results.map(product => ({
          ...product,
          pricing: pricesMap[product.productId] || null,
        }));
      } catch (error) {
        console.error('Failed to fetch prices:', error);
        return productsResponse.Results.map(product => ({
          ...product,
          pricing: null,
        }));
      }
    }

    return [];
  },
};

export const TCG_CATEGORY_MAP = {
  pokemon: 3,
  magic: 1,
  yugioh: 2,
  digimon: 20,
  onepiece: 27,
  dragonball: 27,
  lorcana: 28,
};

export default tcgplayerApi;
