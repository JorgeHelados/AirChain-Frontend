import React, { useState, useEffect } from "react";
import "../Style/admin.css";
import { obtenerDatosSensores } from "../js/admin.js";

function Admin() {
  const [datos, setDatos] = useState([]); // Estado para los datos de la tabla
  const [cargando, setCargando] = useState(true); // Estado para la carga

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    async function cargarDatos() {
      try {
        const datosAPI = await obtenerDatosSensores(); // Llama a la función para obtener datos
        console.log(datosAPI);
        setDatos(datosAPI); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false); // Cambia el estado de carga
      }
    }
    cargarDatos();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administrador</h1>
      <div className="admin-content">
        {cargando ? (
          <p>Cargando datos...</p>
        ) : (
          <table className="admin-table">
            {/* CABECERA DE LA TABLA */}
            <thead>
              <tr>
                <th>Sensor</th>
                <th>Propietario</th>
                <th>Tiempo Desconectado</th>
                <th>Ozono (O<sub>3</sub>)</th>
                <th>Dióxido de Nitrógeno (NO<sub>2</sub>)</th>
                <th>Monóxido de Carbono (CO)</th>
              </tr>
            </thead>

            {/* CUERPO DE LA TABLA */}
            <tbody>
              {Array.isArray(datos) && datos.length > 0 ? (
                datos.map((dato, index) => {
                  const tiempoRojo = dato.Ultima_Medida.includes("d"); // Si contiene "d", es más de un día
                  const ozonoRojo = dato.Ozono > 20 || dato.Ozono < 0;
                  const dioxidoRojo = dato.Dioxido_Nitrogeno > 20 || dato.Dioxido_Nitrogeno < 0;
                  const monoxidoRojo = dato.Monoxido_Carbono > 5000 || dato.Monoxido_Carbono < 0;

                  return (
                    <tr key={index}>
                      <td>{dato.ID_Sensor}</td>
                      <td>{dato.Propietario}</td>
                      <td className={tiempoRojo ? "texto-rojo" : ""}>
                        {dato.Ultima_Medida}
                      </td>
                      <td className={ozonoRojo ? "texto-rojo" : ""}>
                        {dato.Ozono}
                      </td>
                      <td className={dioxidoRojo ? "texto-rojo" : ""}>
                        {dato.Dioxido_Nitrogeno}
                      </td>
                      <td className={monoxidoRojo ? "texto-rojo" : ""}>
                        {dato.Monoxido_Carbono}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Admin;
