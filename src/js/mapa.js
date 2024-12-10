
const API_URL = "http://192.168.83.173:4000";

/**
 * @brief Obtiene medidas de gases desde la API.
 * 
 * Esta función realiza una solicitud a la API para obtener datos relacionados con un gas específico.
 * Retorna los datos en formato JSON o un arreglo vacío en caso de error.
 * 
 * @async
 * @param {string} tipoGas - Tipo de gas del cual se desean obtener medidas (por ejemplo, "Ozono").
 * @returns {Array<Object>} - Un arreglo de objetos con las medidas del gas solicitado.
 * 
 * @throws {Error} - Lanza un error si la respuesta de la API no es exitosa.
 */
//--------------------------------------
// string -> obtenerMedidas() -> string
//--------------------------------------
export const obtenerMedidas = async (tipoGas) => {
  try {
      const response = await fetch(`${API_URL}/api/gases/medidas?Gas=${tipoGas}`);
      if (!response.ok) {
          throw new Error('Error al obtener las medidas de gases');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
};

/**
 * @brief Calcula el valor medio de medidas agrupadas por coordenadas geográficas.
 * 
 * Esta función toma un conjunto de medidas, las agrupa por latitud y longitud, y 
 * calcula el valor promedio para cada grupo.
 * 
 * @param {Array<Object>} medidas - Arreglo de medidas que contienen latitud, longitud, tipo de gas y valor.
 * @returns {Array<Object>} - Un arreglo de objetos, cada uno representando una coordenada con el gas, latitud, longitud, y su valor medio.
 * 
 * @example
 * // Entrada:
 * [
 *   { Latitud: 40.123, Longitud: -3.456, Gas: "Ozono", Valor: 50 },
 *   { Latitud: 40.123, Longitud: -3.456, Gas: "Ozono", Valor: 60 }
 * ]
 * // Salida:
 * [
 *   { Latitud: 40.123, Longitud: -3.456, Gas: "Ozono", ValorMedio: 55 }
 * ]
 */

//--------------------------------------
// Lista<string> -> calcularMediaPorCoordenadas() -> OBJ
//--------------------------------------
export const calcularMediaPorCoordenadas = (medidas) => {
    const agrupadas = medidas.reduce((acc, medida) => {
        const key = `${medida.Latitud},${medida.Longitud}`;
        if (!acc[key]) {
            acc[key] = { ...medida, suma: medida.Valor, count: 1 };
        } else {
            acc[key].suma += medida.Valor;
            acc[key].count += 1;
        }
        return acc;
    }, {});

    return Object.values(agrupadas).map(({ Latitud, Longitud, Gas, suma, count }) => ({
        Latitud,
        Longitud,
        Gas,
        ValorMedio: suma / count,
    }));
};

  


  
