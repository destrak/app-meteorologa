import React from 'react';
import TarjetaDato from './TarjetaDato';

const TablaTemperatura = ({ temperaturaActual, elementos }) => {
  // Los elementos ya vienen filtrados del backend, solo los mostramos
  return (
    <div className="tarjetas-grid">
      {elementos.length > 0 ? (
        elementos.map((el) => <TarjetaDato key={el.id} dato={el} />)
      ) : (
        <p style={{ color: 'white' }}>No hay actividades recomendadas para esta temperatura.</p>
      )}
    </div>
  );
};

export default TablaTemperatura;