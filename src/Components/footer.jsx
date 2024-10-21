import React from 'react';
import '../Style/footer.css';
import logo from '../Images/logo.png';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Logo" />
            <h2>Air Chain</h2>
          </div>
          <nav>
            <ul className="footer-links">
              <li><a href="/">Inicio</a></li>
              <li><a href="/acerca_de">Acerca de</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/terminos">Privacidad</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Air Chain. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;