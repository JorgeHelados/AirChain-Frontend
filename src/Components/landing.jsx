import React from 'react';
import '../Style/landing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faMobileAlt, faCogs, faMapMarkerAlt, faGlobe, faUsers, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import video from '../Images/Video_Fondo.mp4';

function Landing() {
    return (
        <div className="landing-container">
            <section className="intro-section">
                <video autoPlay loop muted className="background-video">
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
                <div className='about-container'>
                    <h1>Conectándote con un aire más limpio</h1>
                    <p>
                        En un entorno urbano donde la calidad del aire puede variar de una calle a otra, estar informado puede marcar la diferencia entre respirar salud o contaminación.
                        <br /><br />
                        Diseñado para quienes se preocupan por su bienestar, Air Chain te proporciona datos en tiempo real sobre los niveles de CO2, ozono (O3) y otros gases contaminantes, ayudándote a identificar las zonas más limpias y seguras en tu ciudad.
                        <br /><br />
                        Con este llavero inteligente, tendrás el control de tu entorno, optimizando tus rutas y tus decisiones diarias para mejorar tu calidad de vida y bienestar ambiental.
                    </p>
                </div>
            </section>

            <section className="how-section">
                <h2>¿Cómo funciona?</h2>
                <div className="how-grid">
                    <div className="how-box">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                        <h3>Localización precisa</h3>
                        <p>Usa la tecnología de GPS para detectar tu ubicación y ofrecerte datos específicos de la calidad del aire en tiempo real.</p>
                    </div>
                    <div className="how-box">
                        <FontAwesomeIcon icon={faGlobe} className="icon" />
                        <h3>Datos globales</h3>
                        <p>Consulta el mapa de la calidad del aire y elige las rutas más limpias para tu trayecto diario.</p>
                    </div>
                    <div className="how-box">
                        <FontAwesomeIcon icon={faUsers} className="icon" />
                        <h3>Comunidad conectada</h3>
                        <p>Contribuye y comparte tus datos con una comunidad que se preocupa por un ambiente más saludable.</p>
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
