import React from 'react';
import '../Style/landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faMobileAlt, faCogs, faMapMarkerAlt, faGlobe, faUsers, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import video from '../Images/Video_Fondo.mp4';
import tioFresco from '../Images/tio-respiron.jpg';

function Landing() {
    return (
        <div className="landing-container">
            <section className="intro-section">
                <video autoPlay loop muted className="background-video" alt="Video de presentación">
                    <source src={video} type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
                <div className="overlay"></div>
                <div className="intro-content">
                    <h1>Air Chain</h1>
                    <p>Monitorea lo que respiras</p>
                    <button className="intro-button" onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}>
                        Descubre más
                    </button>
                </div>
            </section>

            <section id="about-section" className="about-section">
                <div className="about-container">
                    <div className="about-image">
                        <img src={tioFresco} alt="Calidad del aire" />
                    </div>
                    <div className="about-text">
                        <h1>Conectándote con un aire más limpio</h1>
                        <p>
                            En entornos urbanos, la calidad del aire cambia rápidamente. Air Chain te informa en tiempo real sobre ozono, dióxido de nitrógeno y otros contaminantes. Diseñado para tu bienestar, identifica zonas más limpias y seguras en la ciudad. Con este llavero inteligente, controlas tu entorno. Optimiza tus rutas y mejora tus decisiones diarias para una vida más saludable y un ambiente más limpio.
                        </p>
                        <button className="intro-button" onClick={() => document.getElementById('how-section').scrollIntoView({ behavior: 'smooth' })}>
                            Conoce su funcionamiento
                        </button>
                    </div>
                </div>

            </section>



            <section id="how-section" className="how-section">               
                <div className="how-container">
                    <h1>¿Cómo funciona?</h1> 
                    <div className="how-grid">
                        <div className="how-box">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                            <h3>Localización precisa</h3>
                            <p>
                                Usa tecnología GPS para ofrecer datos específicos sobre la calidad del aire en tiempo real, directamente en tu dispositivo.
                            </p>
                        </div>
                        <div className="how-box">
                            <FontAwesomeIcon icon={faGlobe} className="icon" />
                            <h3>Datos globales</h3>
                            <p>
                                Explora un mapa interactivo que muestra las zonas con mejor calidad de aire y optimiza tus rutas diarias.
                            </p>
                        </div>
                        <div className="how-box">
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            <h3>Comunidad conectada</h3>
                            <p>
                                Comparte tus datos con una comunidad global comprometida con mejorar el medio ambiente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </div>
    );
}

export default Landing;
