import React from 'react';

const TarjetaDato = ({ dato }) => {
  return (
    <div className="tarjeta">
      <h3 className="tarjeta-titulo">{dato.nombre}</h3>
      <p className="tarjeta-descripcion">{dato.descripcion}</p>
      <p className="tarjeta-extra">
        {dato.tipo && `Tipo: ${dato.tipo}`}
        {dato.temperaturaMin !== undefined && dato.temperaturaMax !== undefined && (
          <span> | Temp: {dato.temperaturaMin}°C - {dato.temperaturaMax}°C</span>
        )}
      </p>
    </div>
  );
};

export default TarjetaDato;