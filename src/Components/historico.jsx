import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Style/historico.css';

function Historico() {
    const [tipoGas, setTipoGas] = useState('Ozono');
    const [rangoTiempo, setRangoTiempo] = useState('24H');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    // Datos iniciales para la gráfica
    const chartData = {
        labels: ['00:00', '06:00', '12:00', '18:00', '24:00'], // Ejemplo de tiempos
        datasets: [
            {
                label: 'Medición inicial (Ozono)',
                data: [30, 50, 80, 60, 40], // Ejemplo de valores
                borderColor: '#009592',
                backgroundColor: 'rgba(0, 149, 146, 0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="historico-container">
            {/* Contenedor de filtros */}
            <div className="filtros-container">
                <select value={tipoGas} onChange={(e) => setTipoGas(e.target.value)}>
                    <option value="Ozono">Ozono</option>
                    <option value="Dioxido de Nitrogeno">Dióxido de Nitrógeno</option>
                    <option value="Monoxido de Carbono">Monóxido de Carbono</option>
                </select>

                <select value={rangoTiempo} onChange={(e) => setRangoTiempo(e.target.value)}>
                    <option value="24H">24H</option>
                    <option value="48H">48H</option>
                    <option value="Semana">Semana</option>
                    <option value="Mes">Mes</option>
                    <option value="DesdeHasta">Desde / Hasta</option>
                </select>

                {rangoTiempo === 'DesdeHasta' && (
                    <div className="fecha-container">
                        <input
                            placeholder='Desde'
                            type="date"
                            id="desde"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                        <input
                            type="date"
                            id="hasta"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Contenedor de gráfica */}
            <div className="grafica-container">
                <Line data={chartData} options={options} />
                <p>Medición inicial (Ozono)</p>
            </div>
        </div>
    );
}

export default Historico;