import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const ServiceDetail1 = () => {
  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/servicios" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Volver a Servicios
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="h1-premium mb-4">Diseño Web Profesional</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.8' }}>
          Tu sitio web es el vendedor más importante de tu empresa. Creamos interfaces digitales premium
          diseñadas específicamente para maximizar conversiones y proyectar confianza.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '12px' }}>
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80" 
            alt="Web Design" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <div>
          <h2 className="h2-premium" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>¿Qué incluye este servicio?</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {['Diseño UI/UX a Medida', 'Panel Autogestionable (CMS)', 'Optimización SEO Básica', 'Diseño Responsivo (Mobile First)', 'Integración con WhatsApp', 'Soporte Técnico Especializado'].map((item, i) => (
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

export default ServiceDetail1;
