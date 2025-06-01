import React from 'react';
import TarjetaDato from './TarjetaDato';

const TablaAmbos = ({ climaActual, temperaturaActual, elementos }) => {
 const filtrados = elementos.filter(
  e => temperaturaActual >= e.temperaturaIdeal && e.climaIdeal.includes(climaActual)
);


return (
  <div>
    <h2 className="seccion-titulo">
    </h2>
    <div className="tarjetas-grid">
      {filtrados.length > 0 ? (
        filtrados.map((el, i) => <TarjetaDato key={i} dato={el} />)
      ) : (
        <p>No hay actividades recomendadas para estas condiciones.</p>
      )}
    </div>
  </div>
);

};

export default TablaAmbos;
