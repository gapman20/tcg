import React from 'react';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const cases = [
    { title: 'E-commerce Élite', cat: 'Desarrollo Web', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80', gradient: 'from-[#3b82f6] to-[#8b5cf6]' },
    { title: 'Plataforma FinTech', cat: 'App React Native', img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80', gradient: 'from-[#10b981] to-[#3b82f6]' },
    { title: 'Portal Inmobiliario', cat: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80', gradient: 'from-[#f59e0b] to-[#ef4444]' },
    { title: 'Dashboard Inteligente', cat: 'Sistemas a Medida', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80', gradient: 'from-[#3b82f6] to-[#0ea5e9]' }
  ];

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '600px', height: '600px', background: 'var(--accent-primary)', filter: 'blur(250px)', opacity: '0.08', borderRadius: '50%', zIndex: -1 }}></div>

      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <div className="animate-fade-up">
           <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '50px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '1px' }}>
              NUESTROS RESULTADOS
           </div>
           <h1 className="h1-premium mb-4">Portafolio Destacado</h1>
           <p className="subtitle">Explora los últimos productos digitales que hemos llevado al mercado, superando consistentemente las expectativas de facturación de nuestros clientes.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {cases.map((project, i) => (
          <div key={i} className={`glass-card animate-fade-up delay-${(i+1)*100}`} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'grab' }}>
            
            <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 50%)', zIndex: 1 }}></div>
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)', ':hover': { transform: 'scale(1.1)' } }} />
              
              <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2, background: 'rgba(5, 5, 5, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <ExternalLink size={20} color="white" />
              </div>
            </div>

            <div style={{ padding: '2rem', flex: 1, position: 'relative', zIndex: 2, marginTop: '-3rem' }}>
              <span className="text-gradient" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>{project.cat}</span>
              <h3 className="h2-premium" style={{ fontSize: '1.8rem', marginTop: '0.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', color: 'white' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Visita el detalle técnico, la solución del problema de negocio y el impacto real medido en el ROI del cliente tras 6 meses.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
