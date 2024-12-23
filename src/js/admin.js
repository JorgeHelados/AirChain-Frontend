
const API_URL = "http://192.168.83.173:4000";

/**
 * @brief Calcula el tiempo que un sensor ha estado desconectado desde su última medida.
 * 
 * Esta función calcula la diferencia de tiempo entre la fecha/hora actual y la última 
 * medida registrada de un sensor. La diferencia se convierte en días, horas y minutos.
 * 
 * @param {string} horaUltimaMedida - Fecha y hora de la última medida en formato ISO (ejemplo: "2024-12-09T12:00:00Z").
 * @returns {string} - Una cadena que indica el tiempo transcurrido en formato "Xd Xh Xm", o "Desconocido" si la entrada no es válida.
 * 
 * @example
 * // Calcular el tiempo desconectado desde una fecha específica:
 * const tiempo = calcularTiempoDesconectado("2024-12-08T15:30:00Z");
 * console.log(tiempo); // Ejemplo de salida: "1d 2h 15m"
 */

//--------------------------------------
// string -> calcularTiempoDesconectado() -> string
//--------------------------------------
export function calcularTiempoDesconectado(horaUltimaMedida) {
  const ultimaMedida = new Date(horaUltimaMedida); // Convierte a fecha
  const ahora = new Date(); // Fecha/hora actual
  const diferencia = ahora - ultimaMedida; // Diferencia en milisegundos

  if (isNaN(diferencia)) return "Desconocido"; // Si la fecha es inválida

  // Convierte la diferencia en unidades legibles
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

  return `${dias > 0 ? `${dias}d ` : ""}${horas > 0 ? `${horas}h ` : ""}${minutos}m`;
}


/**
 * @brief Obtiene datos de los sensores desde la API y los enriquece con el tiempo desconectado.
 * 
 * Esta función realiza una solicitud a la API para obtener datos administrativos de los sensores, 
 * y para cada sensor calcula el tiempo que ha estado desconectado desde su última medida.
 * 
 * @async
 * @returns {Array<Object>} - Un arreglo de objetos con los datos de los sensores enriquecidos, incluyendo el tiempo desconectado.
 * 
 * @throws {Error} - Lanza un error si ocurre un problema al obtener los datos de la API.
 * 
 * @example
 * // Obtener y procesar datos de sensores:
 * const sensores = await obtenerDatosSensores();
 * console.log(sensores);
 * // Ejemplo de salida:
 * // [
 * //   { ID_Sensor: 1, Propietario: "Juan", Ultima_Medida: "2d 3h 15m", Ozono: 50, Dioxido_Nitrogeno: 30, Monoxido_Carbono: 20 },
 * //   ...
 * // ]
 */

//--------------------------------------
// obtenerDatosSensores() -> Lista<OBJ>
//--------------------------------------
export async function obtenerDatosSensores() {
  try {
    const response = await fetch(`${API_URL}/api/gases/datosAdmin`);
    const datos = await response.json();

    // Enriquecer datos con tiempo desconectado
    return datos.map((dato) => ({
      ...dato,
      Ultima_Medida: calcularTiempoDesconectado(dato.Ultima_Medida),
    }));
  } catch (error) {
    console.error("Error al obtener medidas:", error);
    throw error;
  }
}


