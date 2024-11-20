import React from 'react';
import '../Style/header.css';
import logo from '../Images/logo.png';

const Header_Admin = () => {
  return (
    <header className="header sticky-header">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>    
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <li><a className='Cerrar-sesion' href="/">Cerrar sesión</a></li>
          <li>
            <button className="header-button">Informe de Nodos Inactivos</button>
          </li>
          <li>
            <button className="header-button">Lecturas Erróneas</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header_Admin;
