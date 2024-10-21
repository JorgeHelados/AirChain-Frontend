import React from 'react';
import '../Style/register.css';

function Register() {
    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Regístrate</h2>
                <input type="name" placeholder="Nombre" zz/>
                <input type="surname" placeholder="Apellido" />
                <input type="email" placeholder="Correo electrónico" />
                <input type="password" placeholder="Contraseña" />
                <div className="checkbox-container">
                    <input type="checkbox" />
                    Acepto los&nbsp;
                    <a href="/terminos" className="terms_and_conditions">
                        términos y condiciones
                    </a>
                </div>
                <button>Registrarse</button>
            </div>
        </div>
    );
}

export default Register;