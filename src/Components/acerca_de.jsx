import React from 'react';
import '../Style/acerca_de.css'; // Asegúrate de crear este archivo CSS

const AcercaDe = () => {
  return (
    <div className='acerca-de-page'>
        <div className="acerca-de-container">
            <h1>Quienes somos</h1>
            <p>
                Nosotros somos AirChain, un nuevo startup moderno que busca ayudar a sus ciudadanos más vulnerables y a su vez hacer mediante el uso de tecnologías IOT, nuestras ciudades y parques más limpios y ecológicos mediante la colaboración entre todos los ciudadanos.
            </p>
            <h2>Misión</h2>
            <p>
                Con el auge de patógenos en el aire debido a la cuarentena de hace unos años, la gente ahora más que nunca busca respirar aire limpio y puro debido al aumento de las emisiones de CO2 y otros tipos de gases nocivos.
            </p>
            <p>
                Desde entonces en AirChain, decidimos empezar un proyecto que permitiese a la población conocer con mayor detalle las concentraciones de estos gases en todo momento, por lo que desarrollamos un sensor que va siempre contigo y una pagina web que recoge esos datos y los representa en un mapa para que todo el mundo pueda acceder a esas medidas. De esta manera los ciudadanos podrán pasear por las zonas mas limpias y el gobierno dispone de datos para poder solucionar los problemas en las zonas más peligrosas.
            </p>
            <h2>Visión</h2>
            <p>
                Actualmente solo estamos funcionando en la zona de Gandía, pero en caso de éxito nos gustaría expandirnos a toda la Comunidad Valenciana y después a toda España, ya que ha mayor sea la zona en la que trabajamos, mayor es la cantidad de datos que recibimos y mayor es la cantidad de territorio que esta siendo analizado en cualquier momento.
            </p>
            <h2>Contáctanos</h2>
            <p>AirChain@contacto.es</p>
        </div>
    </div>
  );
};

export default AcercaDe;