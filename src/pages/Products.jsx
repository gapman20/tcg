import React from 'react';
import { useSite } from '../context/SiteContext';

const parseText = (text) => {
  if (!text) return '';
  let html = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-card-primary);">$1</strong>');
  html = html.replace(/^- (.*)$/gm, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin-top: 0.5rem; margin-bottom: 1rem; padding-left: 0;">$1</ul>');
  html = html.replace(/\n/g, '<br/>');
  return html;
};

const Products = () => {
  const { products, theme } = useSite();

  const activeProducts = products?.filter(p => p.active) || [];

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Nuestro <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Catálogo</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Explora nuestra selección de productos eléctricos de alta calidad. Herramientas, iluminación y material al mejor precio.
        </p>
      </section>

      {/* Product Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {activeProducts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem' }}>
            Aún no hay productos disponibles.
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {activeProducts.map((product) => (
              <div 
                key={product.id} 
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 15px 30px ${theme.accentPrimary}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                
                {/* Product Image */}
                <div style={{ height: '240px', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', opacity: 0.5 }}>
                      Sin Imagen
                    </div>
                  )}
                  {product.price && (
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      background: 'var(--accent-primary)',
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '30px',
                      fontWeight: '800',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-heading)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}>
                      {product.price}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '1.25rem', 
                    fontWeight: '800', 
                    color: 'var(--text-card-primary)', 
                    marginBottom: '0.8rem' 
                  }}>
                    {product.name}
                  </h3>
                  
                  <div 
                    style={{ 
                      color: 'var(--text-card-secondary)', 
                      fontSize: '0.95rem', 
                      lineHeight: '1.6', 
                      flex: 1 
                    }}
                    dangerouslySetInnerHTML={{ __html: parseText(product.description) }}
                  />
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
