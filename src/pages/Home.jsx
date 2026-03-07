import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Home = () => {
  const { content, images } = useSite();
  const h = content.home;

  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: '0.15', borderRadius: '50%', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '-5%', width: '400px', height: '400px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: '0.15', borderRadius: '50%', zIndex: 0 }}></div>

      {/* Hero */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '2rem', position: 'relative', zIndex: 1, backgroundImage: images.heroBg ? `url(${images.heroBg})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Dark tint overlay when a bg image is set */}
        {images.heroBg && <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.65)', zIndex: 0 }}></div>}
        <div className="animate-fade-up" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '50px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '2rem', letterSpacing: '1px' }}>
            {h.badge}
          </div>
          <h1 className="h1-premium" style={{ marginBottom: '1.5rem' }}>
            {h.title} <br />
            <span className="text-gradient">{h.titleAccent}</span>
          </h1>
          <p className="subtitle" style={{ marginBottom: '3rem' }}>{h.subtitle}</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacto" className="btn-primary">
              {h.ctaText} <ArrowRight size={20} />
            </Link>
            <Link to="/portafolio" className="btn-outline">{h.ctaSecondary}</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1, background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="h2-premium">{h.featuresTitle}</h2>
            <p className="subtitle">{h.featuresSubtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: 'Velocidad Extrema', icon: <Zap size={32} color="var(--accent-primary)" />, desc: 'Optimizada al máximo para cargar en milisegundos, mejorando la retención de usuarios y el SEO.' },
              { title: 'Seguridad Bancaria', icon: <Shield size={32} color="var(--accent-secondary)" />, desc: 'Protocolos de seguridad avanzados para proteger tu información y la de tus clientes.' },
              { title: 'Alcance Global', icon: <Globe size={32} color="#10b981" />, desc: 'Diseño 100% responsivo adaptable a cualquier pantalla, en cualquier parte del mundo.' }
            ].map((feat, i) => (
              <div key={i} className={`glass-card animate-fade-up delay-${(i + 1) * 100}`}>
                <div className="icon-wrapper">{feat.icon}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--glass-bg)', padding: '4rem 2rem', borderRadius: '24px', border: '1px solid var(--accent-glow)' }}>
          <h2 className="h2-premium" style={{ marginBottom: '1.5rem' }}>{h.ctaSectionTitle}</h2>
          <p className="subtitle" style={{ marginBottom: '2.5rem' }}>{h.ctaSectionSubtitle}</p>
          <Link to="/servicios" className="btn-primary" style={{ padding: '16px 42px', fontSize: '1.2rem' }}>Descubre Nuestros Servicios</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
