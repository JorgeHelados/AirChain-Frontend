//register.js

//--------------------------------------------------
// Emilio Sánchez Granado
// 28/10/2024
//--------------------------------------------------

// Base URL de la API para el servidor
const apiBaseUrl = 'http://192.168.249.173:4000/';

/**
 * Registra un nuevo usuario mediante una solicitud POST a la API.
 * 
 * @function registrarUsuario
 * @param {string} nombre - Nombre del usuario.
 * @param {string} apellidos - Apellidos del usuario.
 * @param {string} correo - Correo electrónico del usuario.
 * @param {string} contrasenya - Contraseña del usuario.
 * @param {string} telefono - Número de teléfono del usuario.
 * @returns {Promise<Object>} Objeto con los datos del usuario registrado si la operación es exitosa.
 * @throws {Error} Si la solicitud falla o el servidor responde con un estado de error.
 */

//---------------------------------------------------------------
// string, string, string, string, string -> registrarUsuario()
//---------------------------------------------------------------

export async function registrarUsuario(nombre, apellidos, correo, contrasenya, telefono) {
    try {
        // Realiza una solicitud POST a la API para registrar un nuevo usuario.
        const response = await fetch(`${apiBaseUrl}api/gases/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                apellidos,
                correo,
                contrasenya,
                telefono
            }),
        });

        // Verifica si la respuesta es exitosa; si no, lanza un error.
        if (!response.ok) {
            throw new Error('Error en el registro de usuario');
        }

        // Convierte la respuesta a JSON.
        const data = await response.json();
        console.log('Usuario registrado:', data);

        return data; // Devuelve los datos del usuario registrado.
    } catch (error) {
        // Muestra el error en la consola.
        console.error('Error:', error);
    }
}
