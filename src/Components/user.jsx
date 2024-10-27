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
                borderColor: '#1565c0',
                fill: false,
                tension: 0.1,
            }
        ],
    };

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
                        <FaSmile color="limegreen" size={100} /> {/*Carita feliz */}
                        {/* <FaMeh color="orange" size={100} />*/}  {/*Carita neutra */}
                        {/* <FaFrown color="red" size={100} />*/}  {/*Carita triste */}
                    </div>
                    <p className="ppm">23ppm</p>
                </div>
            </div>
        </div>
    );
}

export default App;
