import { db } from '../src/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const sampleCards = [
  {
    name: 'Charizard VMAX',
    game: 'Pokemon',
    set: 'Darkness Ablaze',
    rarity: 'Ultra Rare',
    price: 89.99,
    stock: 3,
    description: 'Potent Fire-type card with devastating damage output.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Blue-Eyes White Dragon',
    game: 'Yu-Gi-Oh',
    set: 'Structure Deck',
    rarity: 'Ultra Rare',
    price: 149.99,
    stock: 1,
    description: 'The legendary dragon. A must-have for any collector.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Pikachu',
    game: 'Pokemon',
    set: 'Pokemon GO',
    rarity: 'Rare',
    price: 24.99,
    stock: 5,
    description: 'Electric Mouse Pokemon. Iconic and adorable.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Black Lotus',
    game: 'Magic',
    set: 'Alpha',
    rarity: 'Secret Rare',
    price: 45000,
    stock: 0,
    description: 'The most powerful card in Magic history.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Luffy Gear 5',
    game: 'OnePiece',
    set: 'OP-09',
    rarity: 'Super Rare',
    price: 34.99,
    stock: 8,
    description: 'The awakening of the Gum-Gum Fruit powers.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Agumon',
    game: 'Digimon',
    set: 'BT-17',
    rarity: 'Rare',
    price: 12.99,
    stock: 12,
    description: 'Rookie level Digimon. Reliable partner.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Goku Ultra Instinct',
    game: 'DragonBall',
    set: 'DBS Box',
    rarity: 'Ultra Rare',
    price: 59.99,
    stock: 4,
    description: 'Mastered Ultra Instinct form. God of destruction level.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Mewtwo EX',
    game: 'Pokemon',
    set: 'Paldea Evolved',
    rarity: 'Ultra Rare',
    price: 44.99,
    stock: 6,
    description: 'Psychic powerhouse. Master of psionic abilities.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Dark Magician',
    game: 'Yu-Gi-Oh',
    set: 'Legendary Collection',
    rarity: 'Rare',
    price: 29.99,
    stock: 7,
    description: 'The ultimate wizard. Yamato\'s signature card.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Path to Peril',
    game: 'Magic',
    set: 'Modern Horizons 3',
    rarity: 'Common',
    price: 0.25,
    stock: 50,
    description: 'A simple but effective Sorcery from Modern format.',
    active: true,
    imageUrl: '',
    createdAt: new Date().toISOString()
  }
];

async function seedCards() {
  const cardsRef = collection(db, 'cards');
  
  const snapshot = await getDocs(cardsRef);
  console.log(`Found ${snapshot.size} existing cards. Deleting...`);
  
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, 'cards', docSnap.id));
  }
  
  console.log('Seeding sample cards...');
  
  for (const card of sampleCards) {
    await addDoc(cardsRef, card);
    console.log(`Added: ${card.name}`);
  }
  
  console.log(`\nSuccessfully seeded ${sampleCards.length} cards!`);
}

seedCards().catch(console.error);
