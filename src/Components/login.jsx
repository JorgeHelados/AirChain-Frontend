import React, { useEffect, useState } from 'react';
import '../Style/login.css';

function Login() {
    return (
    <div className="login-container">
        <div className="login-box">
            <h2>Inicia sesión</h2>
            <input type="email" placeholder="Correo electrónico" />
            <input type="password" placeholder="Contraseña" />
            <a href="/recuperar-contraseña" className="forgot-password">
                ¿Has olvidado la contraseña?
            </a>
            <a href="/register" className="forgot-password">
                ¿No tienes cuenta? Regístrate
            </a>
            <button>Iniciar sesión</button>
        </div>
    </div>
    );
}

export default Login;