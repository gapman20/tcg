import React from 'react';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const cases = [
    { title: 'Charizard Holo Vintage', cat: 'Pokémon', img: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80', gradient: 'from-[#e3350d] to-[#f59e0b]' },
    { title: 'Blue-Eyes White Dragon', cat: 'Yu-Gi-Oh!', img: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80', gradient: 'from-[#d4af37] to-[#1e3a8a]' },
    { title: 'Omegamon X Antibody', cat: 'Digimon', img: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80', gradient: 'from-[#00a9ff] to-[#8b5cf6]' },
    { title: 'Pikachu Illustrator', cat: 'Pokémon', img: 'https://images.unsplash.com/photo-1615297690649-1a1e1e04f570?auto=format&fit=crop&q=80', gradient: 'from-[#f59e0b] to-[#e3350d]' }
  ];

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '600px', height: '600px', background: 'var(--accent-gold)', filter: 'blur(250px)', opacity: '0.08', borderRadius: '50%', zIndex: -1 }}></div>

      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <div className="animate-fade-up">
           <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '50px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '1px' }}>
              CARTAS DESTACADAS
           </div>
           <h1 className="h1-premium mb-4">Colección Épica</h1>
           <p className="subtitle">Algunas de las cartas más codiciadas de nuestra colección. Rarezas, ediciones limitadas y tesoros para todo coleccionista.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {cases.map((project, i) => (
          <div key={i} className={`glass-card animate-fade-up delay-${(i+1)*100}`} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'grab' }}>
            
            <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 50%)', zIndex: 1 }}></div>
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              
              <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2, background: 'rgba(5, 5, 5, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <ExternalLink size={20} color="var(--accent-gold)" />
              </div>
            </div>

            <div style={{ padding: '2rem', flex: 1, position: 'relative', zIndex: 2, marginTop: '-3rem' }}>
              <span className="text-gradient" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800', background: 'var(--accent-gold-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{project.cat}</span>
              <h3 className="h2-premium" style={{ fontSize: '1.8rem', marginTop: '0.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', color: 'white' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Carta icónica de la franquicia. Perfecta para colección o para completar tu mazo competitivo.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
