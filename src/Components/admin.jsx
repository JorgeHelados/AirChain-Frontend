import React, { useState, useEffect } from "react";
import "../Style/admin.css";
import { obtenerDatosSensores } from "../js/admin.js";

function Admin() {
  const [datos, setDatos] = useState([]); // Datos de la tabla
  const [cargando, setCargando] = useState(true); // Estado de carga
  const [mostrarPopup, setMostrarPopup] = useState(false); // Estado del popup
  const [filtros, setFiltros] = useState({
    tiempoDesconectado: { activo: false, orden: "mayor" },
    ozono: { activo: false, orden: "mayor" },
    dioxidoNitrogeno: { activo: false, orden: "mayor" },
    monoxidoCarbono: { activo: false, orden: "mayor" },
  });

  // Efecto para cargar datos al inicio
  useEffect(() => {
    async function cargarDatos() {
      try {
        const datosAPI = await obtenerDatosSensores();
        setDatos(datosAPI);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  // Manejar el cambio de los checkboxes
  const manejarCambioCheckbox = (e) => {
    const { name, checked } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: { ...prev[name], activo: checked },
    }));
  };

  // Manejar el cambio del orden (mayor o menor)
  const manejarCambioOrden = (e, nombreFiltro) => {
    const { value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [nombreFiltro]: { ...prev[nombreFiltro], orden: value },
    }));
  };

  const convertirTiempoAMinutos = (tiempo) => {
    const dias = tiempo.match(/(\d+)d/)?.[1] || 0;
    const horas = tiempo.match(/(\d+)h/)?.[1] || 0;
    const minutos = tiempo.match(/(\d+)m/)?.[1] || 0;
    
    return parseInt(dias) * 24 * 60 + parseInt(horas) * 60 + parseInt(minutos);
  };
  

  // Aplicar filtros y ordenar solo las filas con texto en rojo
  const aplicarFiltros = () => {
    const datosEnRojo = [];
    const datosNoRojos = [];

    // Separar los datos en "rojos" y "no rojos"
    datos.forEach((dato) => {
      const tiempoRojo = dato.Ultima_Medida.includes("d");
      const ozonoRojo = dato.Ozono > 20 || dato.Ozono < 0;
      const dioxidoRojo = dato.Dioxido_Nitrogeno > 20 || dato.Dioxido_Nitrogeno < 0;
      const monoxidoRojo = dato.Monoxido_Carbono > 20 || dato.Monoxido_Carbono < 0;

      if (tiempoRojo || ozonoRojo || dioxidoRojo || monoxidoRojo) {
        datosEnRojo.push(dato);
      } else {
        datosNoRojos.push(dato);
      }
    });

    // Ordenar solo los datos en rojo
    datosEnRojo.sort((a, b) => {
      for (const filtro in filtros) {
        if (filtros[filtro].activo) {
          let valorA, valorB;
    
          if (filtro === "tiempoDesconectado") {
            const tiempoA = convertirTiempoAMinutos(a.Ultima_Medida);
            const tiempoB = convertirTiempoAMinutos(b.Ultima_Medida);
    
            if (filtros[filtro].orden === "mayor") {
              return tiempoB - tiempoA; // Mayor primero
            } else {
              return tiempoA - tiempoB; // Menor primero
            }
          } else {
            valorA = a[filtro === "ozono" ? "Ozono" : filtro === "dioxidoNitrogeno" ? "Dioxido_Nitrogeno" : "Monoxido_Carbono"];
            valorB = b[filtro === "ozono" ? "Ozono" : filtro === "dioxidoNitrogeno" ? "Dioxido_Nitrogeno" : "Monoxido_Carbono"];
    
            if (filtros[filtro].orden === "mayor") {
              if (valorA !== valorB) return valorB - valorA;
            } else {
              if (valorA !== valorB) return valorA - valorB;
            }
          }
        }
      }
      return 0; // Si no hay diferencia, mantener el orden actual
    });
    

    // Combinar las filas rojas ordenadas con las no rojas
    setDatos([...datosEnRojo, ...datosNoRojos]);
    setMostrarPopup(false); // Cerrar el popup
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administrador</h1>
      <button onClick={() => setMostrarPopup(true)} className="admin-filter-button">
        Filtrar y Ordenar
      </button>
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
                  const tiempoRojo = dato.Ultima_Medida.includes("d");
                  const ozonoRojo = dato.Ozono > 20 || dato.Ozono < 0;
                  const dioxidoRojo = dato.Dioxido_Nitrogeno > 20 || dato.Dioxido_Nitrogeno < 0;
                  const monoxidoRojo = dato.Monoxido_Carbono > 20 || dato.Monoxido_Carbono < 0;

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

      {/* POPUP DE FILTROS */}
      {mostrarPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Filtrar y Ordenar</h2>
            {Object.keys(filtros).map((filtro) => (
              <div key={filtro}>
                <label>
                  <input
                    type="checkbox"
                    name={filtro}
                    checked={filtros[filtro].activo}
                    onChange={manejarCambioCheckbox}
                  />
                  {filtro === "tiempoDesconectado"
                    ? "Tiempo Desconectado"
                    : filtro === "ozono"
                    ? "Ozono (O3)"
                    : filtro === "dioxidoNitrogeno"
                    ? "Dióxido de Nitrógeno (NO2)"
                    : "Monóxido de Carbono (CO)"}
                </label>
                <select
                  value={filtros[filtro].orden}
                  onChange={(e) => manejarCambioOrden(e, filtro)}
                  disabled={!filtros[filtro].activo}
                >
                  <option value="mayor">Mayor primero</option>
                  <option value="menor">Menor primero</option>
                </select>
              </div>
            ))}
            <button onClick={aplicarFiltros}>Aplicar</button>
            <button onClick={() => setMostrarPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
