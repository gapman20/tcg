import React from 'react';
import ProductCard from './ProductCard';

const CardGrid = ({ cards = [], loading = false, emptyMessage = 'No hay cartas disponibles' }) => {
  if (loading) {
    return (
      <div className="card-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card-skeleton glass-card">
            <div className="card-skeleton-image"></div>
            <div className="card-skeleton-content">
              <div className="card-skeleton-line card-skeleton-title"></div>
              <div className="card-skeleton-line card-skeleton-subtitle"></div>
              <div className="card-skeleton-footer">
                <div className="card-skeleton-line card-skeleton-price"></div>
                <div className="card-skeleton-btn"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="card-grid-empty">
        <p className="subtitle">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {cards.map(card => (
        <ProductCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;
