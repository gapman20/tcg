import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Tag, Clock } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const readingTime = (text = '') => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));

const BlogPost = () => {
  const { id } = useParams();
  const { blogPosts } = useSite();
  const post = (blogPosts || []).find(p => p.id === id);

  if (!post || !post.published) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '4rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Artículo no encontrado</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Este artículo no existe o aún no está publicado.</p>
        <Link to="/blog" className="btn-primary">← Volver al Blog</Link>
      </div>
    );
  }

  const share = () => {
    if (navigator.share) navigator.share({ title: post.title, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); alert('Enlace copiado al portapapeles'); }
  };

  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/blog"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontWeight: '500', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={16} /> Volver al Blog
      </Link>

      <article>
        {post.tags && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {post.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
              <span key={tag} style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '4px 12px', background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)', borderRadius: '50px',
                fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: '700',
              }}>
                <Tag size={11} /> {tag}
              </span>
            ))}
          </div>
        )}

        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', lineHeight: '1.15', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={15} /> {post.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={15} /> {post.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={15} /> {readingTime(post.content)} min lectura</span>
          </div>
        </header>

        {post.image && (
          <div style={{ width: '100%', height: '380px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.9' }}>
          {post.content.split('\n\n').map((para, i) =>
            para.trim() ? <p key={i} style={{ marginBottom: '1.5rem' }}>{para.trim()}</p> : null
          )}
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>¿Te pareció útil este artículo?</h3>
          <button className="btn-outline" onClick={share} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={18} /> Compartir
          </button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/blog" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Ver todos los artículos
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
