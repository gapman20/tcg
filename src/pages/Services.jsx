import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Shield, Truck, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
  const servicesList = [
    { id: '1', title: 'Catálogo Exclusivo', desc: 'Miles de cartas de Pokémon, Digimon, Yu-Gi-Oh! y más. Desde cartas comunes hasta rarezas legendarias.', icon: <Package size={36} color="var(--accent-gold)" />, link: '/catalogo' },
    { id: '2', title: 'Verificación & Autenticidad', desc: 'Cada carta es verificada y protegida. Garantizamos productos 100% originales con nuestro sello de calidad.', icon: <Shield size={36} color="var(--accent-secondary)" />, link: '/catalogo' },
    { id: '3', title: 'Envío Especializado', desc: 'Empaque premium con protectores y cajas reforzadas. Tu carta llega perfecta, como merece.', icon: <Truck size={36} color="var(--accent-primary)" />, link: '/catalogo' },
    { id: '4', title: 'Pre-orders & Limitadas', desc: 'Sé el primero en conseguir cartas de nueva expansión. Pre-orders disponibles para todas las ediciones.', icon: <ArrowRight size={36} color="#10b981" />, link: '/catalogo' },
  ];

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      <SEO 
        title="Colecciones" 
        description="Explora nuestro catálogo de Trading Card Games. Pokémon, Digimon, Yu-Gi-Oh! y más." 
      />
      
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '600px', background: 'var(--accent-gold)', filter: 'blur(200px)', opacity: '0.08', borderRadius: '50%', zIndex: -1 }}></div>

      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <div className="animate-fade-up">
           <h1 className="h1-premium mb-4">Nuestras Colecciones</h1>
           <p className="subtitle">Todo lo que necesitas para tu colección o partida. Productos auténticos, precios justos y pasión por los TCG.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {servicesList.map((srv, index) => (
          <div key={index} className={`glass-card animate-fade-up delay-${(index+1)*100}`} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="icon-wrapper" style={{ 
               background: `linear-gradient(135deg, ${srv.icon.props.color}15, var(--bg-primary))`,
               borderColor: `${srv.icon.props.color}30`
            }}>
               {srv.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{srv.title}</h3>
            <p style={{ marginBottom: '2rem', flex: 1 }}>{srv.desc}</p>
            <Link to={srv.link} className="btn-outline" style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '0.95rem', alignSelf: 'flex-start' }}>
               Ver Catálogo <ArrowRight size={18} style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
