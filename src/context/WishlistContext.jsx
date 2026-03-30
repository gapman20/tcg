import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WISHLIST_STORAGE_KEY = 'tcg_wishlist';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((card) => {
    setItems(prev => {
      const exists = prev.some(item => item.cardId === card.id);
      if (exists) return prev;
      return [...prev, {
        cardId: card.id,
        name: card.name,
        price: card.price,
        imageUrl: card.imageUrl || card.image,
        stock: card.stock,
        game: card.game,
        rarity: card.rarity,
        set: card.set,
        addedAt: new Date().toISOString()
      }];
    });
  }, []);

  const removeItem = useCallback((cardId) => {
    setItems(prev => prev.filter(item => item.cardId !== cardId));
  }, []);

  const isInWishlist = useCallback((cardId) => {
    return items.some(item => item.cardId === cardId);
  }, [items]);

  const getWishlist = useCallback(() => {
    return items;
  }, [items]);

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const toggleItem = useCallback((card) => {
    if (isInWishlist(card.id)) {
      removeItem(card.id);
      return false;
    } else {
      addItem(card);
      return true;
    }
  }, [isInWishlist, removeItem, addItem]);

  return (
    <WishlistContext.Provider value={{
      items,
      itemCount: items.length,
      addItem,
      removeItem,
      isInWishlist,
      getWishlist,
      clearWishlist,
      toggleItem
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};
