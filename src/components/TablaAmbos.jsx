import React from 'react';
import TarjetaDato from './TarjetaDato';

const TablaAmbos = ({ climaActual, temperaturaActual, elementos }) => {
  // Los elementos ya vienen filtrados del backend, solo los mostramos
  return (
    <div>
      <div className="tarjetas-grid">
        {elementos.length > 0 ? (
          elementos.map((el) => <TarjetaDato key={el.id} dato={el} />)
        ) : (
          <p style={{ color: 'white' }}>No hay actividades recomendadas para estas condiciones.</p>
        )}
      </div>
    </div>
  );
};

export default TablaAmbos;