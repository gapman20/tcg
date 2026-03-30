import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Shield, Truck } from 'lucide-react';

const About = () => {
  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '600px', background: 'var(--accent-gold)', filter: 'blur(200px)', opacity: '0.06', borderRadius: '50%', zIndex: -1 }}></div>

      <header style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <h1 className="h1-premium mb-4">Sobre Nosotros</h1>
        <p className="subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Tu destino para cartas coleccionables. Desde 2019 conectando coleccionistas con las mejores piezas de sus juegos favoritos.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80" 
            alt="Colección de cartas" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
          />
        </div>
        <div>
          <h2 className="h2-premium" style={{ marginBottom: '1.5rem' }}>Nuestra Pasión por los TCG</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Adventure nació de la pasión por los Trading Card Games. Somos coleccionistas primero, y entendemos la emoción de encontrar esa carta que completa tu mazo o esa pieza rara que llevabas tiempo buscando.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Trabajamos con proveedores confiables y verificamos cada carta que pasa por nuestras manos. Tu colección está en buenas manos.
          </p>
          <Link to="/catalogo" className="btn-primary" style={{ display: 'inline-flex' }}>
            Explorar Catálogo
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'linear-gradient(135deg, var(--accent-gold)20, var(--bg-primary))',
            border: '1px solid var(--accent-gold)30',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Heart size={28} color="var(--accent-gold)" />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>Coleccionistas</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Entendemos el valor sentimental y económico de cada carta en tu colección.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'linear-gradient(135deg, var(--accent-secondary)20, var(--bg-primary))',
            border: '1px solid var(--accent-secondary)30',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Sparkles size={28} color="var(--accent-secondary)" />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>Productos Premium</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Cada producto es seleccionado cuidadosamente para garantir la mejor calidad.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'linear-gradient(135deg, var(--accent-primary)20, var(--bg-primary))',
            border: '1px solid var(--accent-primary)30',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Shield size={28} color="var(--accent-primary)" />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>100% Auténtico</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Verificamos cada carta. Nada de falsificaciones, solo productos originales.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'linear-gradient(135deg, #10b98120, var(--bg-primary))',
            border: '1px solid #10b98130',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Truck size={28} color="#10b981" />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>Envío Seguro</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Empaque profesional con protectores para que tus cartas lleguen perfectas.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="h2-premium" style={{ marginBottom: '1rem' }}>¿Tienes preguntas?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Estamos aquí para ayudarte a encontrar exactamente lo que buscas. Contáctanos y te asesoramos.
        </p>
        <Link to="/contacto" className="btn-primary" style={{ display: 'inline-flex' }}>
          Contactar
        </Link>
      </div>
    </div>
  );
};

export default About;
