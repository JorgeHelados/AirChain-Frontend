import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import 'chart.js/auto';
import '../Style/user.css';
import { obtenerMedidas } from '../js/grafica.js';

function App() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [lastPpmValue, setLastPpmValue] = useState(0);
    const [tipoGas, setTipoGas] = useState('Ozono'); // Por defecto: 'Ozono'

    useEffect(() => {
        const cargarDatos = async () => {
            const medidas = await obtenerMedidas(tipoGas);

            if (medidas.length > 0) {
                // Transformar los datos para el gráfico
                const labels = medidas.map((medida) =>
                    new Date(medida.Hora).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })
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

                setLastPpmValue(data[data.length - 1] * 10); // Último valor multiplicado por 10
            } else {
                setChartData({ labels: [], datasets: [] });
                setLastPpmValue(0);
            }
        };

        cargarDatos();
    }, [tipoGas]);

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

    let SmileyIcon;
    if (lastPpmValue >= 100) {
        SmileyIcon = <FaFrown color="red" size={70} />;
    } else if (lastPpmValue >= 50) {
        SmileyIcon = <FaMeh color="orange" size={70} />;
    } else {
        SmileyIcon = <FaSmile color="limegreen" size={70} />;
    }

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
                />
                <button className="pair-button">Emparejar</button>
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
                    <p>Hora de la última medición: "La Hora"</p>
                    <div className="smiley">{SmileyIcon}</div>
                    <p className="ppm">{lastPpmValue} ppm</p>
                </div>
            </div>
        </div>
    );    
}

export default App;
