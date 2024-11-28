//miPerfil.js

//--------------------------------------------------
// Emilio Sánchez Granado
// 28/10/2024
//--------------------------------------------------
const apiBaseUrl = 'http://192.168.1.28:4000/';

/**
 * Carga los datos del perfil de un usuario mediante una solicitud GET a la API.
 *
 * @function cargarDatosPerfil
 * @param {string} correo - El correo del usuario para identificar su perfil.
 * @returns {Promise<Object>} Objeto con los datos del perfil del usuario.
 * @throws {Error} Si la solicitud falla o el servidor responde con un estado de error.
 * @verbatim
 * Ejemplo de uso:
 * 
 * cargarDatosPerfil('usuario@example.com')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 * @endverbatim
 */

//--------------------------------------
// string -> cargarDatosPerfil()
//--------------------------------------
export async function cargarDatosPerfil(correo) {
    console.log(correo);
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuario/${encodeURIComponent(correo)}`);
        if (!response.ok) throw new Error('Error al obtener datos del usuario');
        return await response.json(); // Devuelve los datos del usuario en formato JSON.
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para ser manejado por el llamador.
    }
}

/**
 * Actualiza los datos del perfil de un usuario mediante una solicitud PUT a la API.
 *
 * @function actualizarPerfil
 * @param {string} id - El ID único del usuario.
 * @param {string} nombre - El nuevo nombre del usuario.
 * @param {string} apellidos - Los nuevos apellidos del usuario.
 * @param {string} telefono - El nuevo número de teléfono del usuario.
 * @returns {Promise<Object>} Objeto con los datos actualizados del usuario.
 * @throws {Error} Si la solicitud falla o el servidor responde con un estado de error.
 */
export async function actualizarPerfil(correo, nombre, apellidos, telefono) {
  try {
    const response = await fetch(`${apiBaseUrl}api/gases/usuario`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Correo: correo, Nombre: nombre, Apellidos: apellidos, Telefono: telefono }),
    });

    if (!response.ok) throw new Error('Error al actualizar el nombre');
    alert("Nombre y apellidos actualizados exitosamente");
} catch (error) {
    console.error('Error:', error);
}
}

  
  
  

/**
 * Cambia la contraseña de un usuario mediante una solicitud PUT a la API.
 *
 * @function cambiarContrasena
 * @param {string} correo - El correo del usuario para identificar su perfil.
 * @param {string} contrasenaActual - La contraseña actual del usuario.
 * @param {string} contrasenaNueva - La nueva contraseña que se establecerá.
 * @throws {Error} Si la solicitud falla o el servidor responde con un estado de error.
 * @verbatim
 * Ejemplo de uso:
 * 
 * cambiarContrasena('usuario@example.com', 'contraseñaAntigua', 'nuevaContraseña')
 *   .then(() => console.log('Contraseña cambiada'))
 *   .catch(error => console.error('Error:', error));
 * @endverbatim
 */

//---------------------------------------------------------------
// string, string, string -> actualizarNombreApellidos()
//---------------------------------------------------------------
export async function cambiarContrasena(correo, contrasenaActual, contrasenaNueva) {
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuario/${correo}/cambiar-contrasena`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contrasenaActual, contrasenaNueva })
        });

        if (!response.ok) throw new Error('Error al cambiar la contraseña');
        alert("Contraseña actualizada exitosamente"); // Muestra mensaje de éxito.
    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al cambiar la contraseña. Verifique su contraseña actual.");
    }
}


