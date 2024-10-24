import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';

import HeaderGeneral from './Components/header';   
import HeaderUser from './Components/header-user'; 
import Footer from './Components/footer';

import Landing from './Components/landing';
import Login from './Components/login';
import Register from './Components/register';
import Terminos from './Components/terminos';
import AcercaDe from './Components/acerca_de';
import Contacto from './Components/contacto';
// import User from './Components/user';
import Perfil from './Components/perfil';
 
import reportWebVitals from './reportWebVitals';

const Header = () => {
  const location = useLocation(); // Obtener la ubicación actual

  const isUserPage = location.pathname === '/user' || location.pathname === '/perfil';

  return (
    <>
      {isUserPage ? <HeaderUser /> : <HeaderGeneral />}
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
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/acerca_de" element={<AcercaDe />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/user" element={<Landing />} /> 
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
