import React from "react";
import "../Style/enlace_solicitud.css"; // Importar el archivo CSS

const SensorPage = () => {
    return (
        <div className="enlazar-container">
            <h1 className="enlazar-title">
                Enlaza tu sensor o, si no dispones de uno, rellena el formulario para su obtención
            </h1>
            <div className="enlazar-content">
                {/* Enlaza tu sensor */}
                <div className="sensor-box">
                    <h2>Enlaza tu sensor</h2>
                    <input
                        type="text"
                        placeholder="Código de serie"
                        className="sensor-input"
                    />
                    <button className="sensor-button">Enlazar sensor</button>
                </div>

                {/* Formulario de obtención */}
                <div className="sensor-box">
                    <h2>Formulario de obtención</h2>
                    <input
                        type="text"
                        placeholder="Dirección postal"
                        className="sensor-input"
                    />
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="C.P."
                            className="sensor-input small-input"
                        />
                        <input
                            type="text"
                            placeholder="Ciudad"
                            className="sensor-input small-input"
                        />
                    </div>
                    <button className="sensor-button">Solicitar sensor</button>
                </div>
            </div>
        </div>
    );
};

export default SensorPage;
