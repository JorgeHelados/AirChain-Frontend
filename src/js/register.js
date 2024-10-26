const apiBaseUrl = 'http://192.168.128.173:4000/';

// Función para registrar un usuario
export async function registrarUsuario(nombre, apellidos, correo, contrasenya, telefono) {
    try {
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

        if (!response.ok) {
            throw new Error('Error en el registro de usuario');
        }

        const data = await response.json();
        console.log('Usuario registrado:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}