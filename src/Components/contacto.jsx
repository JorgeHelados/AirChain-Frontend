import React from 'react';
import '../Style/contacto.css';

function Contacto() {
    return (
        <div className="contacto-container">
            <div className="contacto-box">
                <h2>Contactanos</h2>
                <input type="name" placeholder="Nombre" />
                <input type="email" placeholder="Correo electrónico" />
                <textarea name="textarea" id="" placeholder='Escribe aqui tu comentario'></textarea>
                <button>Enviar comentario</button>
            </div>
        </div>
    );
}

export default Contacto;