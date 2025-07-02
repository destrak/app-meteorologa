import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ActividadesRecomendadas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, temperatura, clima } = useUser();
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/user-preferences/filter/${user.id}?temperatura=${temperatura}&clima=${clima}`)
        .then(res => res.json())
        .then(data => {
          if (data.preferences) {
            setActividades(
              data.preferences
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
          console.error('Error fetching user activities:', err);
        });
    }
  }, [user, temperatura, clima]);

  const irAPreferencias = () => {
    if (location.pathname === '/') {
      navigate('/cuenta');
    } else if (location.pathname === '/cuenta') {
      navigate('/preguntas');
    } else {
      navigate('/cuenta');
    }
  };

  return (
    <div className="actividades-container">
      <h2 className="actividades-titulo">Actividades recomendadas</h2>

      <div className="actividades-lista">
        {actividades.map((actividad, idx) => (
          <ActividadItem key={idx} {...actividad} />
        ))}
      </div>

      <div className="botones-de-preferencias">
        <button className="boton-preferencias" onClick={irAPreferencias}>
          Cambiar preferencias
        </button>
      </div>
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
