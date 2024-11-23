import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import '../Style/header.css';
import logo from '../Images/logo.png';

const Header_User = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>  
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <li><a href="/user">Mis mediciones</a></li>
          <li>
            <a className="header-button" href="/perfil"><FaUser style={{ marginRight: '5px' }} /> Mi perfil</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header_User;
