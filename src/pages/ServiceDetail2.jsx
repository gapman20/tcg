import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const ServiceDetail2 = () => {
  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/servicios" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Volver a Servicios
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="h1-premium mb-4">Marketing Digital Estratégico</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8' }}>
          De nada sirve la mejor página si nadie la visita. Desarrollamos campañas integrales
          para posicionar tu marca exactamente frente a las personas que te están buscando.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '12px' }}>
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
            alt="Digital Marketing" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <div>
          <h2 className="h2-premium" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Estrategias que implementamos</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {['Campañas en Google Ads (SEM)', 'Posicionamiento Orgánico (SEO)', 'Gestión Profesional de Redes', 'Estrategia de Contenidos', 'Email Marketing Automatizado', 'Análisis y Reportes Mensuales'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px' }}>
                <Check color="var(--accent-primary)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail2;
