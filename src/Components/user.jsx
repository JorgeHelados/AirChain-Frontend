import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import 'chart.js/auto';
import '../Style/user.css';
import { obtenerMedidas } from '../js/grafica.js';
import { enlazarSensor } from '../js/grafica.js';
import { cargarDatosPerfil } from '../js/miPerfil.js';

function App() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [lastPpmValue, setLastPpmValue] = useState(0);
    const [tipoGas, setTipoGas] = useState('Ozono'); // Por defecto: 'Ozono'
    const [lastMeasurementTime, setLastMeasurementTime] = useState('N/A');
    const [idUsuario, setIdUsuario] = useState(null); // Estado para el ID del usuario
    const [codigoSerie, setCodigoSerie] = useState(''); // Estado para el código de serie del sensor
    const correo = sessionStorage.getItem('usuarioCorreo'); // Obtener correo desde sessionStorage

    // Cargar perfil y obtener ID de usuario
    useEffect(() => {
        const cargarPerfil = async () => {
            if (correo) {
                const perfil = await cargarDatosPerfil(correo);
                if (perfil && perfil.id) {
                    setIdUsuario(perfil.id);
                } else {
                    console.error('No se pudo cargar el perfil del usuario.');
                }
            }
        };
        cargarPerfil();
    }, [correo]);

    // Cargar datos para el gráfico
    useEffect(() => {
        const cargarDatos = async () => {
            const medidas = await obtenerMedidas(tipoGas);

            if (medidas.length > 0) {
                // Transformar los datos para el gráfico
                const labels = medidas.map((medida) =>
                    new Date(medida.Hora).toISOString().substr(11, 5)
                );
                const data = medidas.map((medida) => medida.Valor);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: `Medición diaria (${tipoGas})`,
                            data,
                            borderColor: '#009592',
                            fill: false,
                            tension: 0.1,
                        },
                    ],
                });

                setLastPpmValue(data[data.length - 1]); // Último valor
                setLastMeasurementTime(labels[labels.length - 1]); // Última hora
            } else {
                setChartData({ labels: [], datasets: [] });
                setLastPpmValue(0);
                setLastMeasurementTime('N/A');
            }
        };

        cargarDatos();
    }, [tipoGas]);

    // Método para enlazar sensor
    const handleEnlazarSensor = async () => {
        if (!codigoSerie) {
            alert('Por favor, introduce un código de serie.');
            return;
        }
        if (!idUsuario) {
            alert('No se pudo obtener el ID del usuario. Revisa tu perfil.');
            return;
        }

        try {
            const resultado = await enlazarSensor(codigoSerie, idUsuario); // Llama al método para enlazar
            if (resultado.success) {
                alert('Sensor enlazado exitosamente.');
            } else {
                alert(`Error al enlazar el sensor: ${resultado.error}`);
            }
        } catch (error) {
            console.error('Error al enlazar el sensor:', error);
            alert('Ocurrió un error al intentar enlazar el sensor.');
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const getSmileyIcon = () => {
        if (tipoGas === 'Ozono') {
            if (lastPpmValue > 8.5) return <FaFrown color="red" size={70} />;
            if (lastPpmValue >= 5.5) return <FaMeh color="orange" size={70} />;
            return <FaSmile color="limegreen" size={70} />;
        } else if (tipoGas === 'Dioxido de Nitrogeno') {
            if (lastPpmValue > 10.1) return <FaFrown color="red" size={70} />;
            if (lastPpmValue >= 2.1) return <FaMeh color="orange" size={70} />;
            return <FaSmile color="limegreen" size={70} />;
        } else if (tipoGas === 'Monoxido de Carbono') {
            if (lastPpmValue > 1500) return <FaFrown color="red" size={70} />;
            if (lastPpmValue >= 201) return <FaMeh color="orange" size={70} />;
            return <FaSmile color="limegreen" size={70} />;
        }
    };

    return (
        <div className="app-container">
            {/* Enlazar llavero */}
            <div className="link-key-container">
                <label htmlFor="key-code" className="key-label">Enlazar llavero:</label>
                <input 
                    type="text" 
                    id="key-code" 
                    placeholder="Código de serie" 
                    className="key-input" 
                    value={codigoSerie}
                    onChange={(e) => setCodigoSerie(e.target.value)}
                />
                <button className="pair-button" onClick={handleEnlazarSensor}>Emparejar</button>
            </div>
    
            {/* Gráfica y caritas */}
            <div className="content">
                <div className="chart-container">
                    {chartData.labels.length > 0 ? (
                        <Line data={chartData} options={options} />
                    ) : (
                        <div className="loading-wave">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    )}
                    <p>Medición diaria</p>
                </div>
                <div className="air-quality-container">
                    <div className="gas-selector">
                        <select
                            value={tipoGas}
                            onChange={(e) => setTipoGas(e.target.value)}
                        >
                            <option value="Ozono">Ozono</option>
                            <option value="Dioxido de Nitrogeno">Dióxido de Nitrógeno</option>
                            <option value="Monoxido de Carbono">Monóxido de Carbono</option>
                        </select>
                    </div>
                    <p>Hora de la última medición: {lastMeasurementTime}</p>
                    <div className="smiley">{getSmileyIcon()}</div>
                    <p className="ppm">{lastPpmValue} ppm</p>
                </div>
            </div>
        </div>
    );    
}

export default App;
