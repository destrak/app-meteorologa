import React from 'react';
import TarjetaDato from './TarjetaDato';

const TablaTemperatura = ({ temperaturaActual, elementos }) => {
  const filtrados = elementos.filter(e => temperaturaActual >= e.temperaturaIdeal);

  return (
    <div className="tarjetas-grid">
      {filtrados.length > 0 ? (
        filtrados.map((el, i) => <TarjetaDato key={i} dato={el} />)
      ) : (
        <p>No hay actividades recomendadas para esta temperatura.</p>
      )}
    </div>
  );
};

export default TablaTemperatura;
