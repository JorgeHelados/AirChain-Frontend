// Grafica.js
const API_URL = 'http://192.168.156.173:4000';

/**
 * @brief Obtiene las mediciones de un gas específico desde la base de datos.
 * @param {string} tipoGas El tipo de gas a filtrar ('Ozono', 'Dioxido de Nitrogeno', 'Monoxido de Carbono').
 * @returns {Array} Lista de mediciones filtradas.
 */
export const obtenerMedidas = async (tipoGas) => {
    try {
        const response = await fetch(`${API_URL}/api/gases/medidas`);
        if (!response.ok) {
            throw new Error('Error al obtener las medidas');
        }
        const data = await response.json();
        // Filtrar los datos por tipo de gas
        return data.filter((medida) => medida.Gas === tipoGas);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
export const enlazarSensor= async (etiqueta, id_usuario) => {
    try {
        const response = await fetch(`${API_URL}/api/gases/sensor/${etiqueta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario })
        });
        if (!response.ok) {
            throw new Error('Error al enlazar el sensor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


