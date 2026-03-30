const POKEAPI_URL = 'https://api.pokemontcg.io/v2';

async function apiRequest(endpoint) {
  const response = await fetch(`${POKEAPI_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Pokémon TCG API Error: ${response.status}`);
  }

  return response.json();
}

export const pokemonTcgApi = {
  searchCards: async (query, options = {}) => {
    const params = new URLSearchParams({
      q: query,
      pageSize: options.limit || 50,
      page: options.page || 1,
      orderBy: options.orderBy || 'name',
    });

    return apiRequest(`/cards?${params}`);
  },

  getCardById: async (id) => {
    return apiRequest(`/cards/${id}`);
  },

  getCardsBySet: async (setId) => {
    return apiRequest(`/cards?q=set.id:${setId}`);
  },

  getSets: async () => {
    return apiRequest('/sets');
  },

  getCardByName: async (name) => {
    return apiRequest(`/cards?name:${encodeURIComponent(name)}`);
  },
};

export const POKEMON_CATEGORY_ID = 'pokemon';

export function formatPokemonCard(card) {
  return {
    id: card.id,
    name: card.name,
    game: 'Pokemon',
    set: card.set?.name || card.setName,
    setCode: card.set?.id || card.setId,
    rarity: card.rarity,
    price: card.cardmarket?.prices?.averageSellingPrice 
      ? parseFloat(card.cardmarket.prices.averageSellingPrice).toFixed(2) 
      : 0,
    priceFoil: card.cardmarket?.prices?.lowestPrice 
      ? parseFloat(card.cardmarket.prices.lowestPrice).toFixed(2) 
      : null,
    image: card.images?.small || card.imageUrlSmall,
    imageLarge: card.images?.large || card.imageUrlHiRes,
    types: card.types,
    supertype: card.supertype,
    stock: 1,
    active: true,
    description: card.flavorText || card.text || '',
    condition: 'NM',
    pokemonId: card.id,
  };
}

export default pokemonTcgApi;
