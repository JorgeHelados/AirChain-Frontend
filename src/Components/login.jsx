import React from 'react';
import '../Style/formularios.css';

function Login() {
    return (
    <div className="form-container">
        <div className="form-box">
            <h2 className='h2-form'>Inicia sesión</h2>
            <input type="email" placeholder="Correo electrónico" className='input-form'/>
            <input type="password" placeholder="Contraseña" className='input-form'/>
            <a href="/recuperar-contraseña" className="forgot-password">
                ¿Has olvidado la contraseña?
            </a>
            <a href="/register" className="forgot-password">
                ¿No tienes cuenta? Regístrate
            </a>
            <button className='button-form'>Iniciar sesión</button>
        </div>
    </div>
    );
}

export default Login;