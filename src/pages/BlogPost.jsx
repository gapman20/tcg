import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

const BlogPost = () => {
  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Volver al Blog
      </Link>

      <article>
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="h1-premium mb-4" style={{ fontSize: '2.5rem' }}>Tendencias de Diseño Web para 2024</h1>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={16} /> Oct 12, 2023</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={16} /> Admin</span>
          </div>
        </header>

        <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', marginBottom: '3rem' }}>
          <img
            src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80"
            alt="Blog post cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="blog-content" style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.9' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            A medida que entramos en un nuevo año, el panorama del diseño web continúa evolucionando rápidamente.
            Las interfaces oscuras (Dark Mode), el minimalismo funcional y las micro-interacciones suaves ya no
            son opcionales, sino expectativas estándar de los usuarios premium.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            En este artículo exploraremos cómo la **Tipografía Fluida** y los **Diseños Glassmórficos** están
            dominando el espacio tecnológico, proporcionando experiencias de usuario (UX) inmersivas que retienen
            por más tiempo a los clientes potenciales y, por lo tanto, aumentan las conversiones de manera significativa.
          </p>
          <h2 className="h2-premium" style={{ fontSize: '1.6rem', margin: '2.5rem 0 1rem', color: 'var(--text-primary)' }}>1. Glassmorfismo Evolucionado</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Utilizar fondos semi-transparentes con desenfoque de fondo crea una jerarquía visual
            impresionante, especialmente cuando se superpone en fondos fotográficos profundos o degradados complejos.
          </p>
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>¿Te pareció útil este artículo?</h3>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={18} /> Compartir
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
