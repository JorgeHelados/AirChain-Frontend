import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../Style/mapas.css';
import { obtenerMedidas, calcularMediaPorCoordenadas, getColorByValor } from '../js/mapa.js';

const Mapas = () => {
    const [gasSeleccionado, setGasSeleccionado] = useState('Ozono'); // Gas por defecto
    const [mostrarEstaciones, setMostrarEstaciones] = useState(false); // Estado para mostrar estaciones
    const mapRef = useRef(null); // Referencia al mapa
    const clusterRefs = useRef({}); // Referencia a los MarkerClusters de cada gas
    const estacionesRef = useRef(null); // Referencia al grupo de estaciones

    const API_TOKEN = '31debb5d43c74935c3212a845ef947c721da9401'; // Token para AQICN

    const actualizarMedidas = async (gasSeleccionado) => {
        if (!clusterRefs.current[gasSeleccionado]) {
            clusterRefs.current[gasSeleccionado] = L.markerClusterGroup(); // Crea un MarkerClusterGroup para el gas
        }
    
        // Limpia el clúster actual 
        clusterRefs.current[gasSeleccionado].clearLayers();
    
        // Obtiene las medidas del gas seleccionado

        const medidas = await obtenerMedidas(gasSeleccionado);
    
        // Calcula los valores medios por coordenadas
        const medidasConMedias = calcularMediaPorCoordenadas(medidas);
    
        // Añade marcadores al clúster
        medidasConMedias.forEach((medida) => {
            const color = getColorByValor(gasSeleccionado, medida.ValorMedio); // Obtiene el color según el valor medio
            const popupContent = `
                <strong>${medida.Gas}</strong><br />
                Valor medio: ${medida.ValorMedio.toFixed(2)}<br />
                Coordenadas: (${medida.Latitud}, ${medida.Longitud})
            `;
            L.marker([medida.Latitud, medida.Longitud], {
                icon: L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color: ${color}; 
                        width: 15px; height: 15px; border-radius: 50%;"></div>`,
                }),
            })
                .bindPopup(popupContent)
                .addTo(clusterRefs.current[gasSeleccionado]);
        });
    };

    const actualizarClústeresVisibles = () => {
        Object.keys(clusterRefs.current).forEach((gas) => {



            if (gas === gasSeleccionado) {
                // Si el clúster corresponde al gas seleccionado, asegúrate de que esté en el mapa
                if (!mapRef.current.hasLayer(clusterRefs.current[gas])) {
                    mapRef.current.addLayer(clusterRefs.current[gas]);
                }
            } else {
                // Si el clúster no corresponde al gas seleccionado, retíralo del mapa
                if (mapRef.current.hasLayer(clusterRefs.current[gas])) {
                    mapRef.current.removeLayer(clusterRefs.current[gas]);
                }
            }
        });
    };

    const cargarEstaciones = async () => {
        if (!estacionesRef.current) {
            estacionesRef.current = L.layerGroup();
        } else {
            estacionesRef.current.clearLayers();
        }

        try {
            const respuesta = await fetch(`https://api.waqi.info/map/bounds/?token=${API_TOKEN}&latlng=37.0,-2.0,41.0,0.0`);
            const datos = await respuesta.json();

            if (datos.status === 'ok') {
                const obtenerDetallesEstacion = async (uid) => {
                    try {
                        const resp = await fetch(`https://api.waqi.info/feed/@${uid}/?token=${API_TOKEN}`);
                        const detalle = await resp.json();
                        if (detalle.status === 'ok') {
                            const iaqi = detalle.data.iaqi || {};
                            return {
                                o3: iaqi.o3 ? iaqi.o3.v : 'N/A',
                                no2: iaqi.no2 ? iaqi.no2.v : 'N/A',
                                co: iaqi.co ? iaqi.co.v : 'N/A',
                            };
                        }
                    } catch (error) {
                        console.error('Error al obtener detalles de la estación:', error);
                    }
                    return { o3: 'N/A', no2: 'N/A', co: 'N/A' };
                };

                for (const estacion of datos.data) {
                    if (estacion.lat && estacion.lon && estacion.aqi) {
                        const detalles = await obtenerDetallesEstacion(estacion.uid);

                        const popupContent = `
                            <strong>${estacion.station.name}</strong><br />
                            AQI: ${estacion.aqi}<br />
                            O₃: ${detalles.o3} µg/m³<br />
                            NO₂: ${detalles.no2} µg/m³<br />
                            CO: ${detalles.co} µg/m³<br />
                            <em>Lat: ${estacion.lat}, Lon: ${estacion.lon}</em>
                        `;
                        L.marker([estacion.lat, estacion.lon], {
                            icon: L.divIcon({
                                className: 'custom-icon',
                                html: `<div style="background-color: #3388ff; width: 15px; height: 15px; border-radius: 50%;"></div>`
                            })
                        })
                        .bindPopup(popupContent)
                        .addTo(estacionesRef.current);
                    }
                }

                if (mostrarEstaciones) {
                    mapRef.current.addLayer(estacionesRef.current);
                }
            }
        } catch (error) {
            console.error('Error al cargar las estaciones:', error);
        }

    };

        // Leyenda del mapa
        const agregarLeyenda = () => {
            const leyenda = L.control({ position: 'bottomright' });
    
            leyenda.onAdd = () => {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML = `
                    <h4>Leyenda</h4>
                    <!-- Cambiar esto si se tienen que hacer cambios en la leyenda -->
                    <i style="background: green;"></i> Óptimo<br>
                    <i style="background: yellow;"></i> Mejorable<br>
                    <i style="background: red;"></i> Crítico<br>
                `;
                return div;
            };
    
            leyenda.addTo(mapRef.current);
        }

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([39.004, -0.168], 12);

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
        if (!clusterRefs.current[gasSeleccionado]) {
            actualizarMedidas(gasSeleccionado).then(() => {
                actualizarClústeresVisibles();
            });
        } else {
            actualizarClústeresVisibles();
        }
    }, [gasSeleccionado]);

    useEffect(() => {
        if (mostrarEstaciones) {
            cargarEstaciones();
        } else if (estacionesRef.current) {
            mapRef.current.removeLayer(estacionesRef.current);
        }
    }, [mostrarEstaciones]);

    return (
        <div>
            <div className='elegir-gas-fake'>
                <select
                    id="selector-gas"
                    value={gasSeleccionado}
                    onChange={(e) => setGasSeleccionado(e.target.value)}
                >
                    <option value="Ozono">Ozono (O₃)</option>
                    <option value="Dioxido de Nitrogeno">Dióxido de Nitrógeno (NO₂)</option>
                    <option value="Monoxido de Carbono">Monóxido de Carbono (CO)</option>
                </select>

                <button style={{ marginLeft: '10px', padding: '5px 10px' }}
                    onClick={() => setMostrarEstaciones((prev) => !prev)}
                >
                    {mostrarEstaciones ? 'Ocultar Estaciones' : 'Mostrar Estaciones'}</button>
            </div>
            <div id="map" style={{ height: '83vh' }}></div>
        </div>
    );
};

export default Mapas;
