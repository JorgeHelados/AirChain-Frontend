import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/header.css';
import logo from '../Images/logo.png';

const Header_User = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/acerca_de">Acerca de</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <li>
            <a className="login-button" href="/perfil">Mi perfil</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header_User;
