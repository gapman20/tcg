import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{
      background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
      padding: scrolled ? '0' : '10px 0'
    }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <Hexagon fill="url(#blue-grad)" color="transparent" size={32} />
          <svg width="0" height="0">
            <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#3b82f6" offset="0%" />
              <stop stopColor="#8b5cf6" offset="100%" />
            </linearGradient>
          </svg>
          LOGO<span>PRO</span>
        </Link>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/nosotros" className="nav-links" onClick={() => setIsOpen(false)}>Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link to="/servicios" className="nav-links" onClick={() => setIsOpen(false)}>Servicios</Link>
          </li>
          <li className="nav-item">
            <Link to="/portafolio" className="nav-links" onClick={() => setIsOpen(false)}>Portafolio</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-links" onClick={() => setIsOpen(false)}>Blog</Link>
          </li>
          <li className="nav-item" style={{ marginLeft: isOpen ? '0' : '1rem' }}>
            <Link to="/contacto" className="btn-primary" onClick={() => setIsOpen(false)} style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
              Comenzar Ahora
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
