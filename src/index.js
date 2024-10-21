import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Components/header';
import Footer from './Components/footer';
import Landing from './Components/landing';
import Login from './Components/login';
import Register from './Components/register';
import Terminos from './Components/terminos';
import AcercaDe from './Components/acerca_de';
import Contacto from './Components/contacto';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/acerca_de" element={<AcercaDe />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
