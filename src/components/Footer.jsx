import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { Hexagon, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const { content } = useSite();
  const social = content.social || {};

  return (
    <footer style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--glass-border)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Hexagon fill="url(#footer-grad)" color="transparent" size={28} />
            <svg width="0" height="0">
              <linearGradient id="footer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="var(--accent-primary)"   offset="0%" />
                <stop stopColor="var(--accent-secondary)" offset="100%" />
              </linearGradient>
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem' }}>{content.siteName}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {content.footer.description}
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" style={socialBtn}>
                <Instagram size={18} />
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noreferrer" style={socialBtn}>
                <Youtube size={18} />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" style={socialBtn}>
                <Facebook size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.2rem', fontSize: '1rem' }}>Navegación</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { to: '/',          label: 'Inicio' },
              { to: '/nosotros',  label: 'Nosotros' },
              { to: '/servicios', label: 'Servicios' },
              { to: '/portafolio',label: 'Portafolio' },
              { to: '/blog',      label: 'Blog' },
              { to: '/contacto',  label: 'Contacto' },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Admin link — separated and very subtle */}
            <li style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link to="/admin"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', opacity: 0.45, display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = 0.45; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                ⚙️ Panel Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.2rem', fontSize: '1rem' }}>Contacto</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>📧 {content.contact.email}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>📱 {content.contact.whatsapp}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>📍 {content.contact.address}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
};

const socialBtn = {
  width: '38px', height: '38px', borderRadius: '8px',
  background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--text-secondary)', textDecoration: 'none',
  transition: 'all 0.2s',
};

export default Footer;
