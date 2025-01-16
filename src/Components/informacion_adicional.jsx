import React from 'react';
import '../Style/informacion.css';
import ozonoImage from '../Images/ozono.png';
import no2Image from '../Images/no2.png';
import coImage from '../Images/co.png';
import aqiImage from '../Images/aqi.png';

const InformacionAdicional = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Calidad del Aire</h1>

        <div className="info-section">
          <h2>Ozono troposférico (O₃)</h2>
          <img src={ozonoImage} alt="Ozono troposférico" className="info-image" />
          <p><strong>Causas:</strong> El ozono troposférico, conocido como “ozono malo”, es un gas incoloro e inodoro que se forma cerca de la superficie terrestre a través de reacciones químicas entre óxidos de nitrógeno (NOx) y compuestos orgánicos volátiles (COVs), en presencia de luz solar. Se origina principalmente por la actividad humana, como el tráfico rodado, las industrias y la quema de combustibles fósiles.</p>
          <p><strong>Efectos en la salud:</strong> Es un potente oxidante que afecta gravemente el sistema respiratorio y cardiovascular. Puede causar tos, irritación, dificultad para respirar, y agravar enfermedades respiratorias crónicas como el asma.</p>
          <p><strong>Factores que agravan sus efectos:</strong> La concentración, la duración de la exposición, y las condiciones ambientales pueden intensificar sus efectos.</p>
          <p><strong>Grupos afectados:</strong> Niños menores de 6 años, personas con enfermedades respiratorias o cardiovasculares.</p>
          <p><strong>Valores límite recomendados:</strong> En Madrid, niveles seguros: 0–0.05 ppm; moderados: 0.05–0.07 ppm; y no saludables: &gt;0.7 ppm.</p>
          <p><strong>Consejos para reducir la exposición:</strong> Evitar actividades al aire libre en horas de alta concentración, reducir actividad física intensa, promover transporte sostenible y usar medicamentos preventivos si es necesario.</p>
        </div>

        <div className="info-section">
          <h2>Dióxido de Nitrógeno (NO₂)</h2>
          <img src={no2Image} alt="Dióxido de Nitrógeno" className="info-image" />
          <p><strong>Causas:</strong> Se forma principalmente por la quema de combustibles fósiles en vehículos, industrias, y centrales eléctricas. Su concentración es más alta en zonas urbanas y en condiciones climáticas específicas como altas temperaturas.</p>
          <p><strong>Efectos en la salud:</strong> Es un irritante respiratorio que puede agravar el asma, reducir la función pulmonar, y aumentar la susceptibilidad a infecciones respiratorias.</p>
          <p><strong>Factores que agravan sus efectos:</strong> Altas concentraciones, mayor duración de la exposición, y la falta de ventilación en espacios cerrados.</p>
          <p><strong>Grupos afectados:</strong> Niños, ancianos, personas con enfermedades respiratorias o cardiovasculares.</p>
          <p><strong>Valores límite recomendados:</strong> Concentración media anual: ≤40 µg/m³; máxima (1 hora): ≤200 µg/m³.</p>
          <p><strong>Consejos para reducir la exposición:</strong> Usar transporte público, evitar ejercicio en áreas contaminadas, ventilar espacios cerrados, y realizar mantenimiento regular de vehículos.</p>
        </div>

        <div className="info-section">
          <h2>Monóxido de Carbono (CO)</h2>
          <img src={coImage} alt="Monóxido de Carbono" className="info-image" />
          <p><strong>Causas:</strong> Se genera por la combustión incompleta de combustibles fósiles en vehículos, calefactores, estufas de gas, y chimeneas. Se acumula en espacios cerrados o mal ventilados.</p>
          <p><strong>Efectos en la salud:</strong> Puede causar intoxicación aguda (dolor de cabeza, mareos, confusión) y agravar enfermedades cardiovasculares. En casos extremos, puede ser fatal.</p>
          <p><strong>Factores que agravan sus efectos:</strong> Alta concentración, exposición prolongada, y espacios cerrados mal ventilados.</p>
          <p><strong>Grupos afectados:</strong> Niños, ancianos, y personas con enfermedades respiratorias o cardiovasculares.</p>
          <p><strong>Valores límite recomendados:</strong> Promedio en 8 horas: ≤10 mg/m³; corto plazo (1 hora): ≤30 mg/m³.</p>
          <p><strong>Consejos para reducir la exposición:</strong> Instalar detectores de CO, evitar combustibles fósiles en interiores, ventilar adecuadamente, y mantener vehículos en buen estado.</p>
        </div>

        <div className="info-section">
          <h2>AQI (Índice de Calidad del Aire)</h2>
          <img src={aqiImage} alt="Índice de Calidad del Aire" className="info-image" />
          <p><strong>¿Qué es el AQI?:</strong> Es una métrica estándar para comunicar la calidad del aire. Informa sobre los niveles de contaminación y los riesgos para la salud.</p>
          <ul>
            <li>0–50 (Verde): Buena.</li>
            <li>51–100 (Amarillo): Moderada.</li>
            <li>101–150 (Naranja): Insalubre para grupos sensibles.</li>
            <li>151–200 (Rojo): Insalubre.</li>
            <li>201–300 (Púrpura): Muy insalubre.</li>
            <li>301+ (Marrón): Peligroso.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformacionAdicional;
