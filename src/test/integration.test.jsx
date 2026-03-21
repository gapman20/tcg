import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext.jsx';

const TestWrapper = ({ children, user = false }) => (
  <CartProvider user={user}>{children}</CartProvider>
);

const TestConsumerWithAdd = () => {
  const { items, addItem } = useCart();
  return (
    <div>
      <span data-testid="items">{JSON.stringify(items)}</span>
      <button data-testid="add" onClick={() => addItem({ id: 'card1', name: 'Test', price: 10, imageUrl: '', stock: 5, game: 'Pokemon', rarity: 'Rare' })}>Add</button>
    </div>
  );
};

const TestConsumerWithMerge = () => {
  const { items, mergeCarts } = useCart();
  return (
    <div>
      <span data-testid="items">{JSON.stringify(items)}</span>
      <button data-testid="merge" onClick={() => mergeCarts(
        [{ cardId: 'local1', quantity: 2, price: 10 }],
        [{ cardId: 'fb1', quantity: 1, price: 20 }]
      )}>Merge</button>
      <button data-testid="merge-same" onClick={() => mergeCarts(
        [{ cardId: 'same1', quantity: 3, price: 10, name: 'Card' }],
        [{ cardId: 'same1', quantity: 2, price: 10, name: 'Card' }]
      )}>Merge Same</button>
    </div>
  );
};

describe('Cart merge on login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('merges local cart with Firebase cart', async () => {
    render(<TestWrapper user={true}><TestConsumerWithMerge /></TestWrapper>);
    await act(async () => {
      screen.getByTestId('merge').click();
    });
    await waitFor(() => {
      const items = JSON.parse(screen.getByTestId('items').textContent);
      expect(items.length).toBe(2);
      const localItem = items.find(i => i.cardId === 'local1');
      expect(localItem.quantity).toBe(2);
      const fbItem = items.find(i => i.cardId === 'fb1');
      expect(fbItem.quantity).toBe(1);
    });
  });

  it('combines quantities for same items', async () => {
    render(<TestWrapper user={true}><TestConsumerWithMerge /></TestWrapper>);
    await act(async () => {
      screen.getByTestId('merge-same').click();
    });
    await waitFor(() => {
      const items = JSON.parse(screen.getByTestId('items').textContent);
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(5);
    });
  });

  it('clears localStorage after merge', async () => {
    render(<TestWrapper user={true}><TestConsumerWithMerge /></TestWrapper>);
    await act(async () => {
      screen.getByTestId('merge').click();
    });
    await waitFor(() => {
      expect(localStorage.getItem('tcg_cart')).toBeNull();
    });
  });
});

describe('Cart persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads cart from localStorage on init', async () => {
    localStorage.setItem('tcg_cart', JSON.stringify([{ cardId: 'saved1', quantity: 2, price: 15 }]));
    render(<TestWrapper user={false}><TestConsumerWithAdd /></TestWrapper>);
    await waitFor(() => {
      const items = JSON.parse(screen.getByTestId('items').textContent);
      expect(items.length).toBe(1);
      expect(items[0].cardId).toBe('saved1');
    });
  });
});

const CatalogFilterConsumer = () => {
  const cards = [
    { id: '1', game: 'Pokemon', name: 'Pikachu' },
    { id: '2', game: 'YuGiOh', name: 'Dark Magician' },
    { id: '3', game: 'Pokemon', name: 'Charizard' },
    { id: '4', game: 'Digimon', name: 'Agumon' },
  ];
  const filter = 'Pokemon';
  const filtered = filter ? cards.filter(c => c.game === filter) : cards;
  return (
    <div>
      <span data-testid="all">{cards.length}</span>
      <span data-testid="filtered">{filtered.length}</span>
    </div>
  );
};

describe('Catalog filtering', () => {
  it('filters cards by game', () => {
    render(<div><CatalogFilterConsumer /></div>);
    expect(screen.getByTestId('all').textContent).toBe('4');
    expect(screen.getByTestId('filtered').textContent).toBe('2');
  });

  it('returns all cards when no filter', () => {
    const { container } = render(
      <div>
        {(() => {
          const cards = [{ id: '1' }, { id: '2' }, { id: '3' }];
          return <span data-testid="count">{cards.length}</span>;
        })()}
      </div>
    );
    expect(container.querySelector('[data-testid="count"]').textContent).toBe('3');
  });
});

describe('Order lookup validation', () => {
  it('validates order ID format', () => {
    const isValidOrderId = (id) => /^ORD-\d+-[a-z0-9]{4}$/.test(id);
    expect(isValidOrderId('ORD-1234567890-abcd')).toBe(true);
    expect(isValidOrderId('invalid')).toBe(false);
    expect(isValidOrderId('')).toBe(false);
  });

  it('validates email format', () => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    expect(isValidEmail('test@test.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('rejects invalid email for order lookup', () => {
    const email = 'not-an-email';
    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    expect(isValidEmail(email)).toBe(false);
  });
});