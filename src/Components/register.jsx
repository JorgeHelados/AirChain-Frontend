import { registrarUsuario } from '../js/register.js'; // Asegúrate de que la ruta sea correcta
import React, { useState } from 'react';
import '../Style/formularios.css';

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
        <div className="form-container">
            <form onSubmit={handleRegister}>
                <div className="form-box">
                    <h2 className='h2-form'>Regístrate</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className='input-form'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            className='input-form'
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className='input-form'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className='input-form'
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
                        <button type="submit" className='button-form'>Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
