import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Layout, Megaphone, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Services = () => {
  const servicesList = [
    { id: '1', title: 'Diseño Web Ultrasónico', desc: 'Interfaces de usuario vibrantes y animadas. Arquitectura frontend de última generación para superar a tu competencia.', icon: <Monitor size={36} color="var(--accent-primary)" />, link: '/servicios/1' },
    { id: '2', title: 'Marketing de Dominación', desc: 'Estrategias SEM y SEO agresivas utilizando IA para posicionar tu marca en todos los frentes digitales disponibles.', icon: <Megaphone size={36} color="var(--accent-secondary)" />, link: '/servicios/2' },
    { id: '3', title: 'Aplicaciones Móviles', desc: 'Desarrollo nativo o híbrido que se siente fluido como el agua, pensado para la retención del usuario.', icon: <Smartphone size={36} color="#10b981" />, link: '#' },
    { id: '4', title: 'Sistemas a Medida', desc: 'Sistemas administrativos, CRMs y automatización de procesos complejos bajo arquitecturas severamente robustas.', icon: <Layout size={36} color="#f59e0b" />, link: '#' },
  ];

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      <SEO 
        title="Servicios" 
        description="Desarrollamos armas digitales. Tecnologías enfocadas en crecimiento exponencial." 
      />
      
      {/* Subtle background glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '600px', background: 'var(--accent-secondary)', filter: 'blur(200px)', opacity: '0.08', borderRadius: '50%', zIndex: -1 }}></div>

      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <div className="animate-fade-up">
           <h1 className="h1-premium mb-4">Servicios Premium</h1>
           <p className="subtitle">Desarrollamos armas digitales. Tecnologías enfocadas en crecimiento exponencial y autoridad de marca intransigente.</p>
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
              Ver Estrategia <ArrowRight size={18} style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
