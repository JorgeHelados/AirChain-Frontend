// Grafica.js
const API_URL = 'http://192.168.1.28:4000';

/**
 * @brief Obtiene las mediciones de un gas específico desde la base de datos.
 * @param {string} tipoGas El tipo de gas a filtrar ('Ozono', 'Dioxido de Nitrogeno', 'Monoxido de Carbono').
 * @returns {Array} Lista de mediciones filtradas.
 */
//--------------------------------------
// string -> obtenerMedidas() -> string
//--------------------------------------
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


/**
 * @brief Enlaza un sensor a un usuario en el sistema.
 * 
 * Esta función envía una solicitud a la API para enlazar un sensor específico, identificado por su etiqueta, 
 * a un usuario identificado por su ID. Utiliza un método HTTP PUT para realizar la actualización.
 * 
 * @async
 * @param {string} etiqueta - Etiqueta única que identifica al sensor.
 * @param {number} id_usuario - Identificador único del usuario al que se desea enlazar el sensor.
 * @returns {Object|null} - Retorna los datos del sensor actualizado si la operación es exitosa, o `null` en caso de error.
 * 
 * @throws {Error} - Lanza un error si la respuesta de la API no es exitosa.
 * 
 * @example
 * // Enlazar un sensor al usuario con ID 123:
 * const resultado = await enlazarSensor('sensor_abc123', 123);
 * console.log(resultado);
 */
//--------------------------------------
// string, int -> enlazarSensor() -> OBJ
//--------------------------------------
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


