import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import SEO from '../components/SEO';
import { getGameValue } from '../services/api';

const GAMES = {
  pokemon: { name: 'Pokémon TCG', icon: '🔴', color: '#ef4444' },
  yugioh: { name: 'Yu-Gi-Oh!', icon: '💛', color: '#f59e0b' },
  magic: { name: 'Magic: The Gathering', icon: '🔵', color: '#3b82f6' },
  digimon: { name: 'Digimon', icon: '🟣', color: '#8b5cf6' },
  onepiece: { name: 'One Piece', icon: '🏴‍☠️', color: '#dc2626' },
  dragonball: { name: 'Dragon Ball', icon: '🟠', color: '#f97316' },
  lorcana: { name: 'Lorcana', icon: '✨', color: '#ec4899' }
};

const formatPrice = (price) => `$${Number(price).toLocaleString('es-MX')}`;

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const toast = useToast();

  const handleAddToCart = (item) => {
    addItem({
      id: item.cardId,
      name: item.name,
      price: item.price,
      image: item.imageUrl,
      game: item.game,
      rarity: item.rarity
    });
    removeItem(item.cardId);
    toast.success(`${item.name} agregado al carrito`);
  };

  const handleRemove = (cardId, name) => {
    removeItem(cardId);
    toast.info(`${name} eliminado de favoritos`);
  };

  if (items.length === 0) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <SEO title="Mis Favoritos" description="Tu lista de deseos de cartas coleccionables" />
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
        <h1 className="h2-premium">Tu lista de favoritos está vacía</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '2rem' }}>
          Explora nuestro catálogo y añade las cartas que más te gusten
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/catalogo" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Ver Catálogo <ArrowRight size={18} />
          </Link>
          <Link to="/productos" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Productos Sellados
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <SEO title="Mis Favoritos" description="Tu lista de deseos de cartas coleccionables" />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            <Heart size={28} style={{ marginRight: '0.5rem', verticalAlign: 'middle', color: '#ef4444' }} />
            Mis Favoritos
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {items.length} producto{items.length !== 1 ? 's' : ''} en tu lista
          </p>
        </div>
        <button 
          onClick={clearWishlist}
          className="btn-outline"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', borderColor: '#ef4444' }}
        >
          <Trash2 size={16} />
          Vaciar lista
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {items.map(item => {
          const gameKey = getGameValue(item.game);
          const game = GAMES[gameKey] || { name: item.game, icon: '🎴', color: '#6366f1' };
          
          return (
            <div 
              key={item.cardId}
              className="glass-card"
              style={{ padding: '1.5rem', position: 'relative' }}
            >
              <button
                onClick={() => handleRemove(item.cardId, item.name)}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'var(--bg-tertiary)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ef4444'
                }}
              >
                <Trash2 size={14} />
              </button>

              <Link to={`/producto/${item.cardId}`}>
                <div style={{
                  width: '100%',
                  height: '160px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}>
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    />
                  ) : (
                    game.icon
                  )}
                </div>
              </Link>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ 
                  background: `${game.color}20`, 
                  color: game.color, 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {game.icon} {game.name}
                </span>
                {item.rarity && (
                  <span style={{ 
                    background: 'var(--bg-tertiary)', 
                    color: 'var(--text-secondary)', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize'
                  }}>
                    {item.rarity}
                  </span>
                )}
              </div>

              <Link to={`/producto/${item.cardId}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.3
                }}>
                  {item.name}
                </h3>
              </Link>

              {item.set && (
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.875rem',
                  marginBottom: '1rem' 
                }}>
                  {item.set}
                </p>
              )}

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: 'auto'
              }}>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700',
                  color: 'var(--accent-primary)'
                }}>
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                  className="btn-primary"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '8px 16px',
                    fontSize: '0.875rem'
                  }}
                >
                  <ShoppingCart size={14} />
                  {item.stock === 0 ? 'Agotado' : 'Al Carrito'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
