// miPerfil.js
const apiBaseUrl = 'http://192.168.128.173:4000/';
// Función para cargar los datos del perfil del usuario desde la API
export async function cargarDatosPerfil(correoUsuario) {
    try {
        const response = await fetch(`{apiBaseUrl}api/gases/usuarios/${correoUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar los datos del perfil');
        }

        const data = await response.json();
        return data; // Devuelve los datos del usuario
    } catch (error) {
        console.error("Error al cargar el perfil:", error);
        throw error; // Puedes manejar el error más arriba en tu código
    }
}

// Función para actualizar los datos del perfil del usuario
export async function actualizarPerfil(correoUsuario, datosPerfil) {
    const confirmacion = window.confirm("¿Estás seguro de que deseas actualizar tu perfil?");
    
    if (confirmacion) {
        try {
            const response = await fetch(`{apiBaseUrl}api/gases/usuarios/${correoUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosPerfil),
            });
            
            if (!response.ok) {
                throw new Error('Error al actualizar los datos del perfil');
            }

            alert('Perfil actualizado correctamente.');
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            alert('Hubo un error al actualizar el perfil.');
        }
    } else {
        console.log("Actualización cancelada por el usuario.");
    }
}
