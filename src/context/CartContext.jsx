import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CART_STORAGE_KEY = 'tcg_cart';

const CartContext = createContext(null);

export const CartProvider = ({ children, user }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((card) => {
    setItems(prev => {
      const existing = prev.find(item => item.cardId === card.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.cardId === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [...prev, {
          cardId: card.id,
          name: card.name,
          price: card.price,
          quantity: 1,
          imageUrl: card.imageUrl,
          stock: card.stock,
          game: card.game,
          rarity: card.rarity,
        }];
      }
      return updated;
    });
  }, []);

  const removeItem = useCallback((cardId) => {
    setItems(prev => {
      const updated = prev.filter(item => item.cardId !== cardId);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((cardId, quantity) => {
    if (quantity < 1) {
      removeItem(cardId);
      return;
    }
    setItems(prev => {
      const updated = prev.map(item =>
        item.cardId === cardId ? { ...item, quantity } : item
      );
      return updated;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const mergeCarts = useCallback(async (localItems, firebaseItems) => {
    const merged = [...firebaseItems];
    localItems.forEach(localItem => {
      const existing = merged.find(item => item.cardId === localItem.cardId);
      if (existing) {
        existing.quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });
    setItems(merged);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <CartContext.Provider value={{
      items,
      subtotal,
      itemCount,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      mergeCarts,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
