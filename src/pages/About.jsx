import React from 'react';

const About = () => {
  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="h1-premium mb-4">Nosotros</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Conoce al equipo detrás de las mejores experiencias digitales. 
          Nuestra misión es transformar ideas complejas en soluciones web innovadoras y efectivas.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '8px' }}>
          <h2 className="h2-premium" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>Nuestra Misión</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Empoderar a empresas de todos los tamaños mediante el desarrollo de plataformas digitales robustas,
            escalables y visualmente impactantes, asegurando una ventaja competitiva en el mercado.
          </p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '8px' }}>
          <h2 className="h2-premium" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>Nuestra Visión</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Ser la agencia de desarrollo web líder a nivel nacional, reconocida por nuestra excelencia en
            diseño de interfaces (UI), experiencia de usuario (UX) y soluciones autogestionables para nuestros clientes.
          </p>
        </div>
      </div>

      <section>
        <h2 className="h2-premium" style={{ textAlign: 'center', marginBottom: '3rem' }}>Nuestro Equipo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1.5rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', margin: '0 auto 1.5rem', overflow: 'hidden' }}>
                <img src={`https://i.pravatar.cc/150?img=${i + 11}`} alt="Team member" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Especialista WEB {i + 1}</h3>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>Ingeniería & Diseño</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
