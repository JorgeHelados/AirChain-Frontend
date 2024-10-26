const apiBaseUrl = 'http://192.168.128.173:4000/';

export async function iniciarSesion(correo, contrasenya) {
    try {
        const response = await fetch(`${apiBaseUrl}api/gases/usuarios?Correo=${encodeURIComponent(correo)}&Contrasenya=${encodeURIComponent(contrasenya)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }

        const data = await response.json();
        sessionStorage.setItem("usuarioCorreo", data.Correo);

        return data;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error;
    }
}
