const apiBaseUrl = 'http://192.168.128.173:4000/';

// Función para iniciar sesión
export async function iniciarSesion(nombre, contrasenya) {
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuarios?Correo=${encodeURIComponent(nombre)}&Contrasenya=${encodeURIComponent(contrasenya)}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }
        const data = await response.json();
        console.log('Sesión iniciada:', data);
        // Retornar los datos del usuario
        return data;
    } catch (error) {
        console.error('Error:', error);
        console.log('aaaaaaaaaaa');
        throw error; // Lanzar el error para manejarlo más adelante
    }
}
