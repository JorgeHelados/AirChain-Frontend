import React from 'react';
import { Line } from 'react-chartjs-2';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import 'chart.js/auto';
import '../Style/user.css';

function App() {
    const data = {
        labels: ["12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30"],
        datasets: [
            {
                label: 'Medición diaria',
                data: [0, 1.3, 2, 3.6, 4.5, 3, 2.4, 1.5, 2.3],
                borderColor: '#009592',
                fill: false,
                tension: 0.1,
            }
        ],
    };

    const lastPpmValue = data.datasets[0].data[data.datasets[0].data.length - 1] * 10;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

        // Determinar la carita en función del valor de lastPpmValue
        let SmileyIcon;
        if (lastPpmValue >= 100) {
            SmileyIcon = <FaFrown color="red" size={123} />; // Carita triste
        } else if (lastPpmValue >= 50) {
            SmileyIcon = <FaMeh color="orange" size={123} />; // Carita neutra
        } else {
            SmileyIcon = <FaSmile color="limegreen" size={123} />; // Carita feliz
        }

    return (
        <div className="app-container">
            <div className="content">
                <div className="chart-container">
                    <Line data={data} options={options} />
                    <p>Medición diaria</p>
                </div>
                <div className="air-quality-container">
                    <p>Calidad del aire actual:</p>
                    <div className="smiley">
                        {SmileyIcon} 
                    </div>
                    <p className="ppm">{lastPpmValue} ppm</p>
                </div>
            </div>
        </div>
    );
}

export default App;
