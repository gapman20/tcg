import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decorative Glowing Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: '0.15', borderRadius: '50%', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '-5%', width: '400px', height: '400px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: '0.15', borderRadius: '50%', zIndex: 0 }}></div>

      {/* Hero Section */}
      <section className="hero" style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="hero-content animate-fade-up" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '50px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '2rem', letterSpacing: '1px' }}>
            NUEVA VERSIÓN 2024 DISPONIBLE
          </div>
          <h1 className="h1-premium" style={{ marginBottom: '1.5rem' }}>
            Eleva tu Empresa al <br />
            <span className="text-gradient">Siguiente Nivel Digital</span>
          </h1>
          <p className="subtitle" style={{ marginBottom: '3rem' }}>
            Diseñamos experiencias web de alto rendimiento. Estética premium, arquitectura escalable y un panel de control completamente autogestionable pensado para maximizar tus ventas.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacto" className="btn-primary">
              Cotiza tu Proyecto <ArrowRight size={20} />
            </Link>
            <Link to="/portafolio" className="btn-outline">
              Ver Casos de Éxito
            </Link>
          </div>
        </div>
      </section>

      {/* High-Tech Features Section */}
      <section className="features-section" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1, background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="h2-premium">Tecnología de Vanguardia</h2>
            <p className="subtitle">No hacemos páginas comunes. Construimos ecosistemas digitales listos para competir y ganar en tu industria.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: 'Velocidad Extrema', icon: <Zap size={32} color="var(--accent-primary)" />, desc: 'Optimizada al máximo para cargar en milisegundos, mejorando la retención de usuarios y el SEO.' },
              { title: 'Seguridad Bancaria', icon: <Shield size={32} color="var(--accent-secondary)" />, desc: 'Protocolos de seguridad avanzados para proteger tu información y la de tus clientes.' },
              { title: 'Alcance Global', icon: <Globe size={32} color="#10b981" />, desc: 'Diseño 100% responsivo adaptable a cualquier pantalla, en cualquier parte del mundo.' }
            ].map((feature, i) => (
              <div key={i} className={`glass-card animate-fade-up delay-${(i+1)*100}`}>
                <div className="icon-wrapper" style={{ background: i===2 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))' : '', borderColor: i===2 ? 'rgba(16, 185, 129, 0.2)' : '' }}>
                   {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--glass-bg)', padding: '4rem 2rem', borderRadius: '24px', border: '1px solid var(--accent-glow)' }}>
            <h2 className="h2-premium" style={{ marginBottom: '1.5rem' }}>¿Listo para el cambio?</h2>
            <p className="subtitle" style={{ marginBottom: '2.5rem' }}>Únete a las empresas que ya están facturando más gracias a un ecosistema digital profesional.</p>
            <Link to="/servicios" className="btn-primary" style={{ padding: '16px 42px', fontSize: '1.2rem' }}>Descubre Nuestros Servicios</Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
