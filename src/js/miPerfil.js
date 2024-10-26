// src/js/miPerfil.js
const apiBaseUrl = 'http://192.168.128.173:4000/';

export async function cargarDatosPerfil(correo) {
    console.log(correo);
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuario/${encodeURIComponent(correo)}`);
        if (!response.ok) throw new Error('Error al obtener datos del usuario');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function actualizarNombreApellidos(correo, nombre, apellidos, telefono) {
    console.log(nombre);
    console.log(apellidos);
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


// En miPerfil.js, usando la nueva ruta
export async function actualizarTelefono(correo, telefono) {
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuario/telefono/${encodeURIComponent(correo)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Telefono: telefono }),
        });

        if (!response.ok) throw new Error('Error al actualizar el teléfono');
        alert("Número de teléfono actualizado exitosamente");
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function cambiarContrasena(correo, contrasenaActual, contrasenaNueva) {
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuario/${correo}/cambiar-contrasena`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contrasenaActual, contrasenaNueva })
        });

        if (!response.ok) throw new Error('Error al cambiar la contraseña');
        alert("Contraseña actualizada exitosamente");
    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al cambiar la contraseña. Verifique su contraseña actual.");
    }
}


