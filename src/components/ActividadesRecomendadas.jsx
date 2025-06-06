import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ActividadesRecomendadas() {
  const navigate = useNavigate();
  const { user, temperatura, clima } = useUser();
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/user-preferences/filter/${user.id}?temperatura=${temperatura}&clima=${clima}`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched data:', data);
          if (data.preferences) {
            setActividades(
              data.preferences
                .filter(pref => pref.actividades) // Only include if actividades is not null
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
          console.error('Error fetching user activities:', err);
        });
    }
  }, [user, temperatura, clima]);

  const irAPreguntas = () => {
    navigate('/preguntas');
  };

  return (
    <div className="actividades-container">
      <h2 className="actividades-titulo">Actividades recomendadas</h2>

      <div className="actividades-lista">
        {actividades.map((actividad, idx) => (
          <ActividadItem key={idx} {...actividad} />
        ))}
      </div>

      <button className="boton-preferencias" onClick={irAPreguntas}>
        Cambiar preferencias
      </button>
    </div>
  );
}

function ActividadItem({ titulo, duracion, tipo, descripcion }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="actividad-item" onClick={() => setExpandido(!expandido)}>
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

export default ActividadesRecomendadas;