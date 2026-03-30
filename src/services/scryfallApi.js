const SCYFLARY_API_URL = 'https://api.scryfall.com';

async function apiRequest(endpoint) {
  const response = await fetch(`${SCYFLARY_API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Scryfall API Error: ${response.status}`);
  }

  return response.json();
}

export const scryfallApi = {
  searchCards: async (query, options = {}) => {
    const params = new URLSearchParams({
      q: query,
      unique: options.unique || 'cards',
      order: options.order || 'name',
      dir: options.dir || 'asc',
      include_extras: options.includeExtras ? 'true' : 'false',
    });
    
    if (options.page) {
      params.set('page', options.page);
    }

    return apiRequest(`/cards/search?${params}`);
  },

  searchByName: async (name) => {
    return apiRequest(`/cards/named?exact=${encodeURIComponent(name)}`);
  },

  searchByFuzzy: async (name) => {
    return apiRequest(`/cards/named?fuzzy=${encodeURIComponent(name)}`);
  },

  getCardById: async (id) => {
    return apiRequest(`/cards/${id}`);
  },

  getRandomCard: async (query = '') => {
    const endpoint = query 
      ? `/cards/random?q=${encodeURIComponent(query)}` 
      : '/cards/random';
    return apiRequest(endpoint);
  },

  getSetCards: async (setCode, options = {}) => {
    const params = new URLSearchParams({
      unique: options.unique || 'cards',
      order: options.order || 'name',
    });
    return apiRequest(`/cards/sets/${setCode}?${params}`);
  },

  getSets: async () => {
    return apiRequest('/sets');
  },

  getRarities: async () => {
    return apiRequest('/rarities');
  },

  getTypes: async () => {
    return apiRequest('/types');
  },

  getSetByCode: async (setCode) => {
    return apiRequest(`/sets/${setCode}`);
  },
};

export const GAME_CATEGORY_MAP = {
  pokemon: {
    api: 'pokemon',
    searchPrefix: 'game:pokemon',
  },
  magic: {
    api: 'magic',
    searchPrefix: 'game:magic',
  },
  yugioh: {
    api: 'yugioh',
    searchPrefix: 'game:yugioh',
  },
  digimon: {
    api: 'digimon',
    searchPrefix: 'digimon',
  },
  onepiece: {
    api: 'onepiece',
    searchPrefix: 'onepiece',
  },
  dragonball: {
    api: 'dragon_ball',
    searchPrefix: 'dragon ball',
  },
  lorcana: {
    api: 'lorcana',
    searchPrefix: 'lorcana',
  },
};

export function formatCardForStore(card) {
  return {
    id: card.id,
    name: card.name,
    game: mapGameToStore(card.game || card.set?.game),
    set: card.set_name,
    setCode: card.set,
    rarity: card.rarity,
    price: card.prices?.usd ? parseFloat(card.prices.usd) : 0,
    priceFoil: card.prices?.usd_foil ? parseFloat(card.prices.usd_foil) : null,
    image: card.image_uris?.normal || card.image_uris?.small || card.card_faces?.[0]?.image_uris?.normal,
    imageSmall: card.image_uris?.small,
    manaCost: card.mana_cost,
    type: card.type_line,
    oracleText: card.oracle_text,
    flavorText: card.flavor_text,
    power: card.power,
    toughness: card.toughness,
    condition: 'NM',
    stock: 99,
    active: true,
    description: card.oracle_text || '',
    condition: 'NM',
  };
}

function mapGameToStore(game) {
  if (!game) return 'magic';
  const gameLower = game.toLowerCase();
  if (gameLower.includes('pokemon')) return 'pokemon';
  if (gameLower.includes('magic') || gameLower.includes('mtg')) return 'magic';
  if (gameLower.includes('yugioh') || gameLower.includes('yu-gi-oh')) return 'yugioh';
  if (gameLower.includes('digimon')) return 'digimon';
  if (gameLower.includes('one piece')) return 'onepiece';
  if (gameLower.includes('dragon ball')) return 'dragonball';
  if (gameLower.includes('lorcana')) return 'lorcana';
  return 'magic';
}

export default scryfallApi;
