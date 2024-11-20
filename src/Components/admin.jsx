import React from 'react';
import '../Style/admin.css';

function Admin() {
    return (
        <div className="admin-container">
            <h1 className="admin-title">Panel de Administrador</h1>
            <div className="admin-content">
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
                        <tr>
                            <td>Sensor 1</td>
                            <td>Pedro</td>
                            <td>5 min</td>
                            <td>20 ppm</td>
                            <td>15 ppm</td>
                            <td>30 ppm</td>
                        </tr>
                        <tr>
                            <td>Sensor 1</td>
                            <td>Pedro</td>
                            <td>5 min</td>
                            <td>20 ppm</td>
                            <td>15 ppm</td>
                            <td>30 ppm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      );      
}

export default Admin;