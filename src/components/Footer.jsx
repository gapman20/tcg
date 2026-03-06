import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>LOGO PRO</h3>
          <p>Soluciones web profesionales y administrables.</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: info@ejemplo.com</p>
          <p>Tel: +52 123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LOGO PRO. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
