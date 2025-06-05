import React, { useState } from 'react';


const ActividadItem = ({ titulo, duracion, dificultad, descripcion }) => {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="actividad-item" onClick={() => setExpandido(!expandido)}>
      <div className="actividad-header">
        <h3>{titulo}</h3>
        <p className="actividad-meta">
          {duracion} — Dificultad: {dificultad}
        </p>
      </div>
      {expandido && (
        <div className="actividad-descripcion">
          <p>{descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default ActividadItem;
