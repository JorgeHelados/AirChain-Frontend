import React from 'react';
import '../Style/formularios.css';

function CambiarContrasenya() {
    return (
        <div className="form-container">
            <form className="large-form">
                <h1 className="titleLargo">Cambiar contraseña</h1>
                <p>Introduce tu nueva contraseña</p>
                <label>
                    <input className="input" type="password" required/>
                    <span>Contraseña nueva</span>
                </label> 

                <label>
                    <input className="input" type="password" required/>
                    <span>Confirmar contraseña</span>
                </label> 

                <button className='button-form' type="submit">Confirmar contraseña</button>
            </form>
        </div>
    );
}

export default CambiarContrasenya;

