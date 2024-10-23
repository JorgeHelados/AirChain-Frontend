import React from 'react';
import '../Style/formularios.css';

function Contacto() {
    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className='h2-form'>Contactanos</h2>
                <input type="name" placeholder="Nombre" className='input-form'/>
                <input type="email" placeholder="Correo electrónico" className='input-form'/>
                <textarea name="textarea" id="" placeholder='Escribe aqui tu comentario' className='textarea-form'></textarea>
                <button className='button-form'>Enviar comentario</button>
            </div>
        </div>
    );
}

export default Contacto;