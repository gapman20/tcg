import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import SEO from '../components/SEO';

const Home = () => {
  const { content, images } = useSite();
  const h = content.home;

  return (
    <div className="home-page">
      <SEO 
        title="Inicio" 
        description={h.subtitle || "Bienvenido a Electrica, servicios de clase mundial."} 
      />
      
      {/* Decorative Orbs */}
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>

      {/* Hero */}
      <section className="home-hero" style={{ backgroundImage: images.heroBg ? `url(${images.heroBg})` : 'none' }}>
        {/* Dark tint overlay when a bg image is set */}
        {images.heroBg && <div className="hero-overlay"></div>}
        <div className="animate-fade-up hero-content-wrapper">
          <div className="hero-badge">
            {h.badge}
          </div>
          <h1 className="h1-premium hero-title">
            {h.title} <br />
            <span className="text-gradient">{h.titleAccent}</span>
          </h1>
          <p className="subtitle hero-subtitle">{h.subtitle}</p>
          <div className="hero-buttons">
            <Link to="/contacto" className="btn-primary">
              {h.ctaText} <ArrowRight size={20} />
            </Link>
            <Link to="/portafolio" className="btn-outline">{h.ctaSecondary}</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="container-1280">
          <div className="features-header">
            <h2 className="h2-premium">{h.featuresTitle}</h2>
            <p className="subtitle">{h.featuresSubtitle}</p>
          </div>
          <div className="features-grid">
            {[
              { title: 'Velocidad Extrema', icon: <Zap size={32} color="var(--accent-primary)" />, desc: 'Optimizada al máximo para cargar en milisegundos, mejorando la retención de usuarios y el SEO.' },
              { title: 'Seguridad Bancaria', icon: <Shield size={32} color="var(--accent-secondary)" />, desc: 'Protocolos de seguridad avanzados para proteger tu información y la de tus clientes.' },
              { title: 'Alcance Global', icon: <Globe size={32} color="#10b981" />, desc: 'Diseño 100% responsivo adaptable a cualquier pantalla, en cualquier parte del mundo.' }
            ].map((feat, i) => (
              <div key={i} className={`glass-card animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="icon-wrapper">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="home-cta-section">
        <div className="home-cta-card">
          <h2 className="h2-premium cta-title">{h.ctaSectionTitle}</h2>
          <p className="subtitle cta-subtitle">{h.ctaSectionSubtitle}</p>
          <Link to="/servicios" className="btn-primary cta-button">Descubre Nuestros Servicios</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
