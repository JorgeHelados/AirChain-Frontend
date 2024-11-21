import React from 'react';
import '../Style/formularios.css';

function RecuperarContrasenya() {
    return (
        <div className="form-container">
            <form className="large-form">
                <h1 className="titleLargo">Recuperar contraseña</h1>
                <p>Introduce tu correo para que te mandemos la pagina de verificación</p>
                <label>
                    <input className="input" type="email" required/>
                    <span>Correo electrónico</span>
                </label> 

                <button className='button-form' type="submit">Verificar correo</button>
            </form>
        </div>
    );
}

export default RecuperarContrasenya;

