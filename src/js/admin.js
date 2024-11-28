const API_URL = "http://192.168.1.28:4000";

// Función para calcular el tiempo transcurrido
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

// Función para obtener datos de sensores
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


