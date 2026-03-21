import React from 'react';

export const GAMES = [
  { id: 'all', name: 'Todos', icon: '🎯', color: '#6366f1' },
  { id: 'pokemon', name: 'Pokémon TCG', icon: '🔴', color: '#ef4444' },
  { id: 'yugioh', name: 'Yu-Gi-Oh!', icon: '💛', color: '#f59e0b' },
  { id: 'magic', name: 'Magic: The Gathering', icon: '🔵', color: '#3b82f6' },
  { id: 'digimon', name: 'Digimon', icon: '🟣', color: '#8b5cf6' },
  { id: 'dragonball', name: 'Dragon Ball', icon: '🟠', color: '#f97316' },
  { id: 'onepiece', name: 'One Piece', icon: '🏴‍☠️', color: '#dc2626' },
  { id: 'lorcana', name: 'Lorcana', icon: '✨', color: '#ec4899' },
];

const GameFilter = ({ currentGame = 'all', onChange }) => {
  return (
    <div className="game-filter">
      {GAMES.map(game => (
        <button
          key={game.id}
          className={`game-filter-btn ${currentGame === game.id ? 'active' : ''}`}
          onClick={() => onChange(game.id)}
          data-game={game.id}
        >
          {game.name}
        </button>
      ))}
    </div>
  );
};

export default GameFilter;
