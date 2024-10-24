import { registrarUsuario } from '../js/register.js';  // Asegúrate de que la importación sea correcta
import React from 'react';
import '../Style/formularios.css';


function Register() {
    const handleRegister = (event) => {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los inputs
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const contrasenya = document.getElementById('contrasenya').value;

        // Llamar a la función registrarUsuario con los valores del formulario
        registrarUsuario(nombre, apellidos, correo, contrasenya)
            .then(response => {
                // Aquí puedes manejar lo que ocurre si el registro es exitoso
                alert('Registro exitoso');
                console.log(response);
                // Redirigir a otra página, por ejemplo
                window.location.href = "login";
            })
            .catch(error => {
                // Manejar el error si ocurre
                alert('Error en el registro');
                console.error(error);
            });
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className='h2-form' >Regístrate</h2>
                <form id="registerForm" onSubmit={handleRegister}>
                    <input className='input-form' id="nombre" type="text" placeholder="Nombre" />
                    <input className='input-form' id="apellidos" type="text" placeholder="Apellido" />
                    <input className='input-form' id="correo" type="email" placeholder="Correo electrónico" />
                    <input className='input-form' id="contrasenya" type="password" placeholder="Contraseña" />
                    <div className="checkbox-container">
                        <input type="checkbox" />
                        Acepto los&nbsp;
                        <a href="/terminos" className="terms_and_conditions">
                            términos y condiciones
                        </a>
                    </div>
                    <button lassName='button-form' type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
