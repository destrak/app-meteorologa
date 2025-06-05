import React from 'react';
import TarjetaDato from './TarjetaDato';

const TablaClima = ({ climaActual, elementos }) => {
  const filtrados = elementos.filter(e => e.climaIdeal.includes(climaActual));


return (
  <div>
    <div className="tarjetas-grid">
      {filtrados.length > 0 ? (
        filtrados.map((el, i) => <TarjetaDato key={i} dato={el} />)
      ) : (
        <p>No hay actividades recomendadas para este clima.</p>
      )}
    </div>
  </div>
);

};

export default TablaClima;
