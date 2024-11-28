import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import '../Style/user.css';
import { obtenerMedidas } from '../js/grafica.js';
import { enlazarSensor } from '../js/grafica.js';
import { cargarDatosPerfil } from '../js/miPerfil.js';

ChartJS.register(annotationPlugin);

function App() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [lastPpmValues, setLastPpmValues] = useState({}); // Últimas mediciones de todos los gases
    const [averagePpm, setAveragePpm] = useState(0); // Promedio de las últimas 8 horas
    const [lastMeasurementTime, setLastMeasurementTime] = useState('N/A');
    const [tipoGas, setTipoGas] = useState('Ozono'); // Gas seleccionado
    const [idUsuario, setIdUsuario] = useState(null);
    const [codigoSerie, setCodigoSerie] = useState('');
    const correo = sessionStorage.getItem('usuarioCorreo'); // Obtener correo desde sessionStorage

    useEffect(() => {
        const cargarPerfil = async () => {
            if (correo) {
                const perfil = await cargarDatosPerfil(correo);

                if (perfil.ID_Usuarios !== undefined) {
                    setIdUsuario(perfil.ID_Usuarios);
                } else {
                    console.error('No se pudo cargar el perfil del usuario.');
                }
            }
        };
        cargarPerfil();
    }, [correo]);

    useEffect(() => {
        const cargarDatos = async () => {
            const gases = ['Ozono', 'Dioxido de Nitrogeno', 'Monoxido de Carbono'];
            const allData = await Promise.all(gases.map(obtenerMedidas));

            // Obtener datos del gas seleccionado
            const selectedGasData = allData[gases.indexOf(tipoGas)] || [];
            const labels = selectedGasData.map((medida) =>
                new Date(medida.Hora).toISOString().substr(11, 5)
            );

            const datasets = [
                {
                    label: tipoGas,
                    data: selectedGasData.map((medida) => medida.Valor),

                    backgroundColor: tipoGas === 'Ozono' ? '#009592' :
                                      tipoGas === 'Dioxido de Nitrogeno' ? '#009592' :
                                      '#009592',

                    borderColor: tipoGas === 'Ozono' ? '#009592' :
                                 tipoGas === 'Dioxido de Nitrogeno' ? '#FF5733' :
                                 '#FFC300',
                    fill: false,
                    tension: 0.1,
                    yAxisID: 'y1',
                },
            ];

            setChartData({
                labels,
                datasets,
            });

           /* // Calcular el promedio de las últimas 8 horas
            const now = new Date();
            const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
            const filteredData = selectedGasData.filter(
                (medida) => new Date(medida.Hora) >= eightHoursAgo
            );
            const average =
                filteredData.reduce((sum, medida) => sum + medida.Valor, 0) / filteredData.length || 0;
            setAveragePpm(average);*/
            const medidas = await obtenerMedidas(tipoGas);

            const valores = medidas.map((medida) => medida.Valor);

            // Promedio de las últimas 8 horas
            const promedio = valores.slice(-8).reduce((sum, val) => sum + val, 0) / Math.min(8, valores.length);
            setAveragePpm(promedio);


            // Actualizar las últimas mediciones de todos los gases
            const newLastPpmValues = {};
            gases.forEach((gas, index) => {
                const lastValue = allData[index]?.slice(-1)[0] || { Valor: 0 };
                newLastPpmValues[gas] = lastValue.Valor;
            });
            setLastPpmValues(newLastPpmValues);

            // Actualizar la última hora de medición del gas seleccionado
            if (selectedGasData.length > 0) {
                const lastValue = selectedGasData[selectedGasData.length - 1];
                setLastMeasurementTime(new Date(lastValue.Hora).toISOString().substr(11, 5));
            } else {
                setLastMeasurementTime('N/A');
            }
        };

        cargarDatos();
    }, [tipoGas]);

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
            const resultado = await enlazarSensor(codigoSerie, idUsuario);
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
                display: true,
            },
            annotation: {
                annotations: {
                    orangeLimit: {
                        type: 'line',
                        yMin: tipoGas === 'Ozono' ? 7 : tipoGas === 'Dioxido de Nitrogeno' ? 5.1 : tipoGas === 'Monoxido de Carbono' ? 9.1 : 1,
                        yMax: tipoGas === 'Ozono' ? 7 : tipoGas === 'Dioxido de Nitrogeno' ? 5.1 : tipoGas === 'Monoxido de Carbono' ? 9.1: 1,
                        borderColor: 'orange',
                        borderDash: [6, 6],
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            content: 'Límite bajo',
                            position: 'end',
                            color: 'orange',
                        },
                    },
                    redLimit: {
                        type: 'line',
                        yMin: tipoGas === 'Ozono' ? 10.5 : tipoGas === 'Dioxido de Nitrogeno' ? 15.1 : tipoGas === 'Monoxido de Carbono' ? 30.1 : 1,
                        yMax: tipoGas === 'Ozono' ? 10.5 : tipoGas === 'Dioxido de Nitrogeno' ? 15.1 : tipoGas === 'Monoxido de Carbono' ? 30.1: 1,
                        borderColor: 'red',
                        borderDash: [6, 6],
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            content: 'Límite medio',
                            position: 'end',
                            color: 'red',
                        },
                    },
                },
            },
        },
        scales: {
            y1: {
                beginAtZero: true,
                min: 0,
                max: tipoGas === 'Ozono' || tipoGas === 'Dioxido de Nitrogeno' ? 30 : 60,
                position: 'left',
                title: { display: true, text: `${tipoGas} (ppm)` },
            },
        },
    };

    const getSmileyIcon = () => {
        if (tipoGas === 'Ozono') {
            if (averagePpm > 10.5) return <FaFrown color="red" size={70} />;
            if (averagePpm >= 7) return <FaMeh color="orange" size={70} />;
            return <FaSmile color="limegreen" size={70} />;
        } else if (tipoGas === 'Dioxido de Nitrogeno') {
            if (averagePpm > 15) return <FaFrown color="red" size={70} />;
            if (averagePpm >= 5) return <FaMeh color="orange" size={70} />;
            return <FaSmile color="limegreen" size={70} />;
        } else if (tipoGas === 'Monoxido de Carbono') {
            if (averagePpm > 30) return <FaFrown color="red" size={70} />;
            if (averagePpm >= 9) return <FaMeh color="orange" size={70} />;
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

            {/* Últimas mediciones */}
            <div className="last-measurements">
                <p>Hora de la última medición: {lastMeasurementTime}</p>
                <p>Ozono: {lastPpmValues['Ozono']} ppm</p>
                <p>Dióxido de Nitrógeno: {lastPpmValues['Dioxido de Nitrogeno']} ppm</p>
                <p>Monóxido de Carbono: {lastPpmValues['Monoxido de Carbono']} ppm</p>
            </div>

            {/* Selector de gas */}
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

            {/* Gráfica y caritas */}
            <div className="content">
                <div className="chart-container">
                    {chartData.labels.length > 0 ? (
                        <Bar data={chartData} options={options} />
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
                    <p>Promedio 8 horas</p>
                    <div className="smiley">{getSmileyIcon()}</div>
                    <p className="ppm">{averagePpm.toFixed(2)} ppm</p>
                </div>
                <div className="Boton-Historico">
                    <a className="header-button" href="/perfil"> Histórico</a>
                </div>
            </div>
        </div>
    );
}

export default App;
