import React from 'react';
import '../Style/formularios.css';

function Register() {
    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className='h2-form'>Regístrate</h2>
                <input type="name" placeholder="Nombre" className='input-form'/>
                <input type="surname" placeholder="Apellido" className='input-form'/>
                <input type="email" placeholder="Correo electrónico" className='input-form'/>
                <input type="password" placeholder="Contraseña" className='input-form'/>
                <div className="checkbox-container">
                    <input type="checkbox" />
                    Acepto los&nbsp;
                    <a href="/terminos" className="terms_and_conditions">
                        términos y condiciones
                    </a>
                </div>
                <button className='button-form'>Registrarse</button>
            </div>
        </div>
    );
}

export default Register;