import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { obtenerMedidas, calcularMediaPorCoordenadas } from '../js/mapa.js';
import '../Style/mapas.css';

const Mapas = () => {
    const [gasSeleccionado, setGasSeleccionado] = useState('Ozono'); // Gas por defecto
    const mapRef = useRef(null); // Referencia al mapa
    const clusterRefs = useRef({}); // Referencia a los MarkerClusters de cada gas

    const actualizarMedidas = async (tipoGas) => {
        if (!clusterRefs.current[tipoGas]) {
            clusterRefs.current[tipoGas] = L.markerClusterGroup(); // Crea un MarkerClusterGroup para el gas
        }

        // Limpia el clúster actual
        clusterRefs.current[tipoGas].clearLayers();

        // Obtiene las medidas del gas seleccionado
        const medidas = await obtenerMedidas(tipoGas);

        // Calcula los valores medios por coordenadas
        const medidasConMedias = calcularMediaPorCoordenadas(medidas);

        // Añade marcadores al clúster
        medidasConMedias.forEach((medida) => {
            const popupContent = `
                <strong>${medida.Gas}</strong><br />
                Valor medio: ${medida.ValorMedio.toFixed(2)}<br />
                Coordenadas: (${medida.Latitud}, ${medida.Longitud})
            `;
            L.marker([medida.Latitud, medida.Longitud], {
                icon: L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color: ${
                        tipoGas === 'Ozono' ? 'blue' 
                        : tipoGas === 'Dioxido de Nitrogeno' ? 'red' 
                        : 'green'
                    }; 
                        width: 10px; height: 10px; border-radius: 50%;"></div>`,
                }),
            })
                .bindPopup(popupContent)
                .addTo(clusterRefs.current[tipoGas]);
        });
    };

    const actualizarClústeresVisibles = () => {
        Object.keys(clusterRefs.current).forEach((gas) => {
            if (gas !== gasSeleccionado) {
                mapRef.current.removeLayer(clusterRefs.current[gas]);
            } 
            mapRef.current.addLayer(clusterRefs.current[gas]);
        });
    };

    // Leyenda del mapa
    const agregarLeyenda = () => {
        const leyenda = L.control({ position: 'bottomright' });

        leyenda.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            div.innerHTML = `
                <h4>Leyenda</h4>
                <!-- Cambiar esto si se tienen que hacer cambios en la leyenda -->
                <i style="background: blue;"></i> Ozono (O₃)<br>
                <i style="background: red;"></i> Dióxido de Nitrógeno (NO₂)<br>
                <i style="background: green;"></i> Monóxido de Carbono (CO)<br>
            `;
            return div;
        };

        leyenda.addTo(mapRef.current);
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([40.43, -3.65], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors',
            }).addTo(mapRef.current);

            // Agrega la leyenda después de inicializar el mapa
            agregarLeyenda();
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        // Asegúrate de cargar los datos para cada gas solo una vez
        if (!clusterRefs.current[gasSeleccionado]) {
            actualizarMedidas(gasSeleccionado).then(() => {
                actualizarClústeresVisibles(); // Actualiza la visibilidad después de cargar las medidas
            });
        } else {
            actualizarClústeresVisibles(); // Actualiza la visibilidad directamente si los datos ya están cargados
        }
    }, [gasSeleccionado]);

    return (
        <div>
            <div className='elegir-gas'>
                <label htmlFor="selector-gas">Selecciona un gas: </label>
                <select
                    id="selector-gas"
                    value={gasSeleccionado}
                    onChange={(e) => setGasSeleccionado(e.target.value)}
                >
                    <option value="Ozono">Ozono (O₃)</option>
                    <option value="Dioxido de Nitrogeno">Dióxido de Nitrógeno (NO₂)</option>
                    <option value="Monoxido de Carbono">Monóxido de Carbono (CO)</option>
                </select>
                <button>Estaciones oficiales</button>
            </div>
            <div id="map" style={{ height: '73vh' }}>
            </div>
        </div>
    );
};

export default Mapas;
