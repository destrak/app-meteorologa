import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function ActividadesNoRecomendadas() {
  const { user, temperatura, clima } = useUser();
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/user-preferences/filter/${user.id}?temperatura=${temperatura}&clima=${clima}`)
        .then(res => res.json())
        .then(data => {
          if (data.nonPreferredActivities) {
            setActividades(
              data.nonPreferredActivities
                .filter(pref => pref.actividades)
                .map(pref => ({
                  titulo: pref.actividades.nombre || 'Sin título',
                  duracion: pref.actividades.duracion || 'X horas',
                  tipo: pref.actividades.tipo || 'Desconocida',
                  descripcion: pref.actividades.descripcion || 'Sin descripción'
                }))
            );
          }
        })
        .catch(err => {
          console.error('Error fetching non-preferred activities:', err);
        });
    }
  }, [user, temperatura, clima]);

  return (
    <div className="actividades-no-recomendadas-container">
      <h2 className="actividades-titulo">Actividades no recomendadas</h2>

      <div className="actividades-lista">
        {actividades.length === 0 ? (
          <p>No hay actividades no recomendadas en este momento.</p>
        ) : (
          actividades.map((actividad, idx) => (
            <ActividadItem key={idx} {...actividad} />
          ))
        )}
      </div>
    </div>
  );
}

function ActividadItem({ titulo, duracion, tipo, descripcion }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="actividad-item no-recomendada" onClick={() => setExpandido(!expandido)}>
      <div className="actividad-header">{titulo}</div>
      <div className="actividad-meta">
        {duracion} — Tipo: {tipo}
      </div>
      {expandido && (
        <div className="actividad-descripcion">{descripcion}</div>
      )}
    </div>
  );
}

export default ActividadesNoRecomendadas;
