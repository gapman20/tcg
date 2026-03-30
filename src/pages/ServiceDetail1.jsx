import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

const ServiceDetail1 = () => {
  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/servicios" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Volver a Colecciones
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(135deg, var(--accent-gold)20, var(--bg-primary))',
          border: '1px solid var(--accent-gold)30',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={36} color="var(--accent-gold)" />
        </div>
        <h1 className="h1-premium mb-4">Cómo Empezar tu Colección</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8' }}>
          Embárcate en tu viaje por el mundo de los Trading Card Games. Ya sea que quieras competir en torneos o simplemente coleccionar tus cartas favoritas, aquí te guiamos para dar tus primeros pasos.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ 
          width: '100%', 
          height: '300px', 
          overflow: 'hidden', 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--accent-primary)20, var(--accent-secondary)20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '100px' }}>🎴</span>
        </div>

        <div>
          <h2 className="h2-premium" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Pasos para Comenzar</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {[
              'Elige tu Juego Favorito',
              'Compra un Starter Deck',
              'Aprende las Reglas Básicas',
              'Juega con Amigos o en Tiendas',
              'Expande con Boosters y Cartas Sueltas',
              'Participa en Torneos Locales'
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px' }}>
                <Check color="var(--accent-primary)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>¿No sabes qué juego elegir?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Cada TCG tiene su estilo único. Pokémon es perfecto para familias y principiantes. Yu-Gi-Oh! ofrece mecánicas estratégicas profundas. Magic tiene décadas de contenido. ¡Todos son geniales!
          </p>
          <Link to="/catalogo" className="btn-primary" style={{ display: 'inline-flex' }}>
            Ver Todos los Juegos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail1;
