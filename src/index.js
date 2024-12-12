// Imports maravillosos
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';

import HeaderGeneral from './Components/header';   
import HeaderUser from './Components/header-user'; 
import HeaderAdmin from './Components/header-admin'; 
import Footer from './Components/footer';

import Landing from './Components/landing';
import Login from './Components/login';
import Register from './Components/register';
import Contacto from './Components/contacto';
import Recuperar from './Components/recuperar-contrasenya';
import Cambiar from './Components/cambiar-contrasenya';

import Terminos from './Components/terminos';
import AcercaDe from './Components/acerca_de';

import User from './Components/user';
import Historico from './Components/historico';
import Perfil from './Components/perfil';
import Admin from './Components/admin';
import Enlace from './Components/enlace_solicitud';

import Mapas from './Components/mapas';

 
import reportWebVitals from './reportWebVitals';

// Selector de header respecto de la pagina
const Header = () => {
  const location = useLocation(); // Obtener la ubicación actual


  const isUserPage = location.pathname === '/user' || location.pathname === '/perfil' || location.pathname === '/historico' || location.pathname === '/mapas' || location.pathname === '/enlazar';

  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {isUserPage ? <HeaderUser /> : isAdminPage ? <HeaderAdmin/> : <HeaderGeneral />}
    </>
  );
};

// Componente principal
const MainApp = () => {
  return (
    <>
      <Header /> {/* Header dinámico según la ruta */}
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/recuperar-contraseña" element={<Recuperar />} /> 
          <Route path="/cambiar-contraseña" element={<Cambiar />} /> 

          <Route path="/terminos" element={<Terminos />} />
          <Route path="/acerca_de" element={<AcercaDe />} />

          <Route path="/perfil" element={<Perfil />} /> 
          <Route path="/user" element={<User />} /> 
          <Route path="/historico" element={<Historico />} /> 
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/enlazar" element={<Enlace />} /> 


          <Route path="/mapas" element={<Mapas />} /> 

        </Routes>
      <Footer />
    </>
  );
};

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <MainApp /> {/* Usamos MainApp directamente en el index.js */}
    </Router>
  </React.StrictMode>
);

reportWebVitals();
