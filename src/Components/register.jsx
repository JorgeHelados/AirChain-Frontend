import { registrarUsuario } from '../js/register.js';
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
        const contrasenya2 = document.getElementById('contrasenya2').value;
        const telefono = document.getElementById('telefono').value;
        const aceptaTerminos = document.getElementById('aceptaTerminos').checked;

        // Verificar si el checkbox de términos y condiciones está marcado
        if (!aceptaTerminos) {
            alert('Debes aceptar los términos y condiciones para registrarte.');
            return;
        }

        // Validar la contraseña
        const contrasenyaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        if (!contrasenyaRegex.test(contrasenya)) {
            alert('La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un símbolo especial.');
            return;
        }

        // Verificar que las contraseñas coincidan
        if(contrasenya !== contrasenya2) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Llamar a la función registrarUsuario con los valores del formulario
        registrarUsuario(nombre, apellidos, correo, contrasenya, telefono)
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
            <form id="registerForm" onSubmit={handleRegister}>
                <div className="form-box">
                    <h2 className='h2-form'>Regístrate</h2>
                    <input className='input-form' id="nombre" type="text" placeholder="Nombre" />
                    <input className='input-form' id="apellidos" type="text" placeholder="Apellido" />
                    <input className='input-form' id="telefono" type="tel" placeholder="Número de teléfono" />
                    <input className='input-form' id="correo" type="email" placeholder="Correo electrónico" />
                    <input className='input-form' id="contrasenya" type="password" placeholder="Contraseña" />
                    <input className='input-form' id="contrasenya2" type="password" placeholder="Vuelve a escribir la contraseña" />
                    <div className="checkbox-container">
                        <input type="checkbox" id="aceptaTerminos" />
                        Acepto los&nbsp;
                        <a href="/terminos" className="terms_and_conditions">
                            términos y condiciones
                        </a>
                    </div>
                    <button className='button-form' type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
