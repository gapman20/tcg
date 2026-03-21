import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from './Toast';

const ProductCard = ({ card }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const toast = useToast();
  const isOutOfStock = card.stock <= 0;

  const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(card);
      toast.success(`${card.name} agregado al carrito`);
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wasAdded = toggleItem(card);
    if (wasAdded) {
      toast.success(`${card.name} añadido a favoritos`);
    } else {
      toast.info(`${card.name} eliminado de favoritos`);
    }
  };

  const getGameColor = (game) => {
    switch (game?.toLowerCase()) {
      case 'pokemon': return '#e3350d';
      case 'digimon': return '#00a9ff';
      case 'yugioh': return '#d4af37';
      default: return 'var(--accent-primary)';
    }
  };

  const wishlisted = isInWishlist(card.id);

  return (
    <div className="product-card glass-card">
      <div className="product-card-image-container">
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.name} className="product-card-image" />
        ) : (
          <div className="product-card-placeholder">
            <span>{card.name?.charAt(0) || '?'}</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="product-card-out-of-stock">Sin Stock</div>
        )}
        {card.rarity && (
          <span 
            className="product-card-rarity"
            style={{ '--rarity-color': getGameColor(card.game) }}
          >
            {card.rarity}
          </span>
        )}
        <button
          className="product-card-wishlist"
          onClick={handleToggleWishlist}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}
        >
          <Heart size={16} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#fff'} />
        </button>
      </div>
      <div className="product-card-content">
        <h3 className="product-card-name">{card.name}</h3>
        <p className="product-card-game">{card.game}</p>
        {card.set && <p className="product-card-set">{card.set}</p>}
        <div className="product-card-footer">
          <span className="product-card-price">{formatPrice(card.price)}</span>
          {isOutOfStock ? (
            <button className="btn-outline product-card-btn" disabled>
              Agotado
            </button>
          ) : (
            <button 
              className="btn-primary product-card-btn"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
