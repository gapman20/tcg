import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Package } from 'lucide-react';

const ServiceDetail2 = () => {
  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/servicios" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Volver a Colecciones
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(135deg, var(--accent-secondary)20, var(--bg-primary))',
          border: '1px solid var(--accent-secondary)30',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <Shield size={36} color="var(--accent-secondary)" />
        </div>
        <h1 className="h1-premium mb-4">Cuidado y Preservación</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8' }}>
          Tus cartas son tesoros que merecen protección. Aprende a mantener tu colección en perfecto estado para que dure generaciones.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ 
          width: '100%', 
          height: '300px', 
          overflow: 'hidden', 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--accent-secondary)20, var(--accent-gold)20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '100px' }}>📦</span>
        </div>

        <div>
          <h2 className="h2-premium" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Consejos de Conservación</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {[
              'Usa protectores (sleeves) siempre',
              'Guarda en containers rígidos',
              'Evita la luz solar directa',
              'Controla la humedad (45-55%)',
              'No doblas ni dobleces las cartas',
              'Manipula por los bordes'
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px' }}>
                <Check color="var(--accent-secondary)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Package size={32} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Grading</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Para cartas de alto valor, considera enviar a empresas como PSA o CGC para certificación profesional.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <Shield size={32} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Seguro</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Para colecciones valiosas, considera asegurar tu inversión contra robo o daños.
            </p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>¿Necesitas protectores?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Próximamente tendremos los mejores productos de protección para tu colección.
          </p>
          <Link to="/productos" className="btn-primary" style={{ display: 'inline-flex' }}>
            Ver Productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail2;
