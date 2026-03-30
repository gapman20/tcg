import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Blog = () => {
  const { blogPosts } = useSite();
  const [search, setSearch] = useState('');

  const published = (blogPosts || []).filter(p => p.published);
  const filtered = published.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    (p.tags || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1-premium mb-4">Blog TCG</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Guías, análisis de sets, tips de colección y noticias del mundo de los Trading Card Games.
        </p>
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px 12px 44px',
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: '50px', color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)', fontSize: '0.95rem', outline: 'none',
            }}
          />
        </div>
      </header>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎴</p>
          <p style={{ fontSize: '1.1rem' }}>{search ? 'No se encontraron artículos.' : 'Aún no hay artículos publicados.'}</p>
          {!search && <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Pronto traremos guías y análisis de cartas.</p>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {filtered.map(post => (
            <article key={post.id} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: post.image ? '280px 1fr' : '1fr',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {post.image && (
                <div style={{ overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '2rem' }}>
                {post.tags && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {post.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                      <span key={tag} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '3px 10px', background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '50px',
                        fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: '600',
                      }}>
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.8rem', color: 'var(--text-card-primary, var(--text-primary))', lineHeight: '1.2' }}>
                  {post.title}
                </h2>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.2rem', color: 'var(--text-card-secondary, var(--text-secondary))', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {post.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={14} /> {post.author}</span>
                </div>
                <p style={{ color: 'var(--text-card-secondary, var(--text-secondary))', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: 'var(--accent-gold)', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem',
                }}
                  onMouseEnter={e => { e.currentTarget.style.gap = '10px'; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = '6px'; }}
                >
                  Leer artículo <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
