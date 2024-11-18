import React from 'react';
import '../Style/formularios.css';

function Contacto() {
    return (
        <div className="form-container">
            <form className="large-form">
                <h1 className='title'>Contactanos</h1>
                    <label>
                        <input className="input" id="nombre" type="text" placeholder required />
                        <span>Nombre</span>
                    </label>
                    <label>
                        <input className="input" id="correo" type="email" placeholder required />
                        <span>Correo electrónico</span>
                    </label>
                <textarea name="textarea" id="" placeholder='Escribe aqui tu comentario' className='textarea-form'></textarea>
                <button className='button-form'>Enviar comentario</button>  
            </form>
        </div>
    );
}

export default Contacto;