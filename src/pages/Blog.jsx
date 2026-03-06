import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    { id: 1, title: 'Tendencias de Diseño Web para 2024', desc: 'Descubre los estilos visuales y arquitecturas tecnológicas que dominarán la industria digital este año.', date: 'Oct 12, 2023', author: 'Admin' },
    { id: 2, title: 'Cómo optimizar tu SEO Local', desc: 'Estrategias probadas para hacer que tu negocio aparezca primero en las búsquedas de Google Maps de tu ciudad.', date: 'Oct 05, 2023', author: 'Equipo Marketing' },
    { id: 3, title: 'La importancia de un panel autogestionable', desc: 'Por qué depender de un programador para cada cambio de texto es algo del pasado y cómo un CMS ahorra costos.', date: 'Sep 28, 2023', author: 'Admin' }
  ];

  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="h1-premium mb-4">Blog & Noticias</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Mantente actualizado con las últimas tendencias de la industria, consejos de marketing y guías tecnológicas.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr)', gap: '2.5rem' }}>
        {posts.map(post => (
          <article key={post.id} style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '2rem',
            transition: 'transform 0.3s ease'
          }} className="blog-card">
            <h2 className="h2-premium" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{post.title}</h2>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={16} /> {post.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={16} /> {post.author}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              {post.desc}
            </p>
            <Link to={`/blog/${post.id}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'var(--accent-primary)',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Leer Artículo <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
