//inicio.js

//--------------------------------------------------
// Emilio Sánchez Granado
// 28/10/2024
//--------------------------------------------------

// Base URL de la API para el servidor
const apiBaseUrl = 'http://192.168.83.173:4000/';

/**
 * Inicia sesión de un usuario mediante una solicitud GET a la API.
 * 
 * @function iniciarSesion
 * @param {string} correo - El correo del usuario para iniciar sesión.
 * @param {string} contrasenya - La contraseña del usuario.
 * @returns {Promise<Object>} Objeto con los datos del usuario si el inicio de sesión es exitoso.
 * @throws {Error} Si la solicitud falla o el servidor responde con un estado de error.
 */

//--------------------------------------
// string, string -> iniciarSesion()
//--------------------------------------

export async function iniciarSesion(correo, contrasenya) {
    try {
        // Realiza una solicitud GET a la API para iniciar sesión con el correo y la contraseña.
        const response = await fetch(`${apiBaseUrl}api/gases/usuarios?Correo=${encodeURIComponent(correo)}&Contrasenya=${encodeURIComponent(contrasenya)}`, {
            method: 'GET',
        });

        // Verifica si la respuesta es exitosa; si no, lanza un error.
        if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }

        // Convierte la respuesta a JSON.
        const data = await response.json();
        
        // Almacena el correo del usuario en el almacenamiento de sesión.
        sessionStorage.setItem("usuarioCorreo", data.Correo);

        return data; // Devuelve los datos del usuario.
    } catch (error) {
        // Muestra el error en la consola y lanza el error para ser manejado por el llamador.
        console.error('Error en el inicio de sesión:', error);
        throw error;
    }
}
