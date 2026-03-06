import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSite();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <Hexagon fill="url(#blue-grad)" color="transparent" size={32} />
          <svg width="0" height="0">
            <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#3b82f6" offset="0%" />
              <stop stopColor="#8b5cf6" offset="100%" />
            </linearGradient>
          </svg>
          {content.siteName}
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li><Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>Inicio</Link></li>
          <li><Link to="/nosotros" className="nav-links" onClick={() => setIsOpen(false)}>Nosotros</Link></li>
          <li><Link to="/servicios" className="nav-links" onClick={() => setIsOpen(false)}>Servicios</Link></li>
          <li><Link to="/portafolio" className="nav-links" onClick={() => setIsOpen(false)}>Portafolio</Link></li>
          <li><Link to="/blog" className="nav-links" onClick={() => setIsOpen(false)}>Blog</Link></li>
          <li style={{ marginLeft: isOpen ? '0' : '1rem' }}>
            <Link to="/contacto" className="btn-primary" onClick={() => setIsOpen(false)} style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
              {content.ctaButton}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
