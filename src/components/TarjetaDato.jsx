import React from 'react';

const TarjetaDato = ({ dato }) => {
  return (
    <div className="tarjeta">
      <h3 className="tarjeta-titulo">{dato.nombre}</h3>
      <p className="tarjeta-descripcion">{dato.descripcion}</p>
      <p className="tarjeta-extra">⏱️ Tiempo recomendado: {dato.tiempo}</p>
    </div>
  );
};

export default TarjetaDato;
