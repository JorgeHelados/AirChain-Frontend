import React, { useState } from 'react';
import '../Style/register.css';
import { registrarUsuario } from '../js/register.js'; // Asegúrate de que la ruta sea correcta

function Register() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setError(''); // Limpiar errores previos

        try {
            const response = await registrarUsuario(nombre, apellido, email, contrasenya);
            alert('Registro exitoso');
            console.log(response);
            // Redirigir a otra página, por ejemplo a la pantalla de login
            window.location.href = "/login";
        } catch (error) {
            setError('Error en el registro');
            console.error(error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Regístrate</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
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
                    <div className="checkbox-container">
                        <input type="checkbox" required />
                        Acepto los&nbsp;
                        <a href="/terminos" className="terms_and_conditions">
                            términos y condiciones
                        </a>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
