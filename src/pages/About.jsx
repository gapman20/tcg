import React from 'react';
import { useSite } from '../context/SiteContext';

const About = () => {
  const { content } = useSite();
  const a = content.about;

  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="h1-premium mb-4">{a.title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          {a.subtitle}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '12px' }}>
          <h2 className="h2-premium" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>{a.misionTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{a.misionText}</p>
        </div>
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2rem', borderRadius: '12px' }}>
          <h2 className="h2-premium" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>{a.visionTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{a.visionText}</p>
        </div>
      </div>

      <section>
        <h2 className="h2-premium" style={{ textAlign: 'center', marginBottom: '3rem' }}>Nuestro Equipo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', margin: '0 auto 1.5rem', overflow: 'hidden', border: '3px solid var(--accent-primary)' }}>
                <img src={`https://i.pravatar.cc/150?img=${i + 11}`} alt="Team member" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Especialista WEB {i + 1}</h3>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '600' }}>Ingeniería & Diseño</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
