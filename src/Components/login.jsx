import React, { useState } from 'react';
import '../Style/login.css';
import { iniciarSesion } from '../js/inicio.js'; // Asegúrate de que la ruta sea correcta

function Login() {
    const [email, setEmail] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setError(''); // Limpiar errores previos

        try {
            const response = await iniciarSesion(email, contrasenya);
            alert('Inicio de sesión exitoso');
            console.log(response);
            // Redirigir a otra página, por ejemplo
            window.location.href = "home.html";
            console.log('funciona');
        } catch (error) {
            setError('Error en el inicio de sesión'); // Mostrar error
            console.error(error);
            console.log('aaaaaaa');
            
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Inicia sesión</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasenya}
                        onChange={(e) => setContrasenya(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <a href="/recuperar-contraseña" className="forgot-password">
                        ¿Has olvidado la contraseña?
                    </a>
                    <a href="/register" className="forgot-password">
                        ¿No tienes cuenta? Regístrate
                    </a>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
