import { iniciarSesion } from '../js/inicio.js'; // Asegúrate de que la ruta sea correcta
import React, { useState } from 'react';
import '../Style/formularios.css';

function Login() {
    const [email, setEmail] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setError(''); // Limpiar errores previos

        try {
            // Verificar credenciales para el admin
            if (email === 'admin@gmail.com' && contrasenya === '1234') {
                alert('Inicio de sesión como administrador');
                window.location.href = "admin"; // Redirigir a admin.jsx
                return;
            }

            const response = await iniciarSesion(email, contrasenya);
            if (response) {
                alert('Inicio de sesión exitoso');
                console.log(response);
                // Redirigir a otra página, por ejemplo
                window.location.href = "user";
            }
        } catch (error) {
            setError('Correo o contraseña incorrectos'); // Mostrar error
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <form className="large-form" onSubmit={handleLogin}>
                <h1 className="title">Inicia sesión</h1>

                <label>
                    <input className="input" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                    <span>Correo electrónico</span>
                </label> 

                <label>
                    <input className='input' type="password" value={contrasenya}
                    onChange={(e) => setContrasenya(e.target.value)}
                    required />
                    <span>Contraseña</span>
                </label>

                {error && <p className="error-message">{error}</p>}
                <a href="/recuperar-contraseña" className="login-links">
                    ¿Has olvidado la contraseña?
                </a>
                <a href="/register" className="login-links">
                    ¿No tienes cuenta? Regístrate
                </a>

                <button className='button-form' type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;
