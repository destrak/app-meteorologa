import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalEditarPreferencia from './ModalEditarPreferencia';
import ModalNuevaPreferencia from './ModalNuevaPreferencia';

function ActividadesGenerales() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [actividades, setActividades] = useState([]);
  const [actividadAEditar, setActividadAEditar] = useState(null);
  const [nuevaPreferencia, setNuevaPref] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/user-preferences/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.preferences) {
            setActividades(
              data.preferences
                .filter(pref => pref.actividades)
                .map(pref => ({
                  titulo: pref.actividades.nombre || 'Sin título',
                  nombre: pref.actividades.nombre || 'Sin título',
                  duracion: pref.actividades.duracion || 'X horas',
                  tipo: pref.actividades.tipo || 'Desconocida',
                  descripcion: pref.actividades.descripcion || 'Sin descripción',
                  temperatura_min: pref.actividades.temperatura_min,
                  temperatura_max: pref.actividades.temperatura_max,
                  soleado: pref.actividades.soleado,
                  nublado: pref.actividades.nublado,
                  lluvia: pref.actividades.lluvia,
                  idPreferencia: pref.id
                }))
            );
          }
        })
        .catch(err => {
          console.error('Error al obtener actividades generales:', err);
        });
    }
  }, [user]);

  const irAPreferencias = () => {
    if (location.pathname === '/') {
      navigate('/cuenta');
    } else if (location.pathname === '/cuenta') {
      navigate('/preguntas');
    } else {
      navigate('/cuenta');
    }
  };

  const handleEditarGuardar = (editada) => {
    setActividades(prev =>
      prev.map(act =>
        act.idPreferencia === editada.idPreferencia ? editada : act
      )
    );
  };

  const handleNuevaPref = (nuevaActividad) => {
    setActividades(prev => [...prev, nuevaActividad]);
    setNuevaPref(false);
  };

  return (
    <div className="actividades-container">
      <h2 className="actividades-titulo">Todas tus actividades</h2>

      <div className="actividades-lista">
        {actividades.map((actividad, idx) => (
          <ActividadItem
            key={idx}
            {...actividad}
            onEditar={() => setActividadAEditar(actividad)}
          />
        ))}
      </div>

      <div className="botones-de-preferencias">
        <button className="boton-nueva-preferencia" onClick={() => setNuevaPref(true)}>
          Nueva preferencia
        </button>
        <button className="boton-preferencias" onClick={irAPreferencias}>
          Cambiar preferencias
        </button>
      </div>

      {nuevaPreferencia && (
        <ModalNuevaPreferencia
          setNuevaPref={setNuevaPref}
          handleNuevaPref={handleNuevaPref}
        />
      )}

      {actividadAEditar && (
        <ModalEditarPreferencia
          actividad={actividadAEditar}
          onClose={() => setActividadAEditar(null)}
          onGuardar={handleEditarGuardar}
        />
      )}
    </div>
  );
}

function ActividadItem({ titulo, duracion, tipo, descripcion, onEditar }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="actividad-item" onClick={() => setExpandido(!expandido)}>
      <div className="actividad-header">
        {titulo}
      </div>
      <div className="actividad-meta">
        {duracion} — Tipo: {tipo}
      </div>
      {expandido && (
        <div className="actividad-descripcion">
          {descripcion}
          <br />
          <button
            className="editar-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEditar();
            }}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}

export default ActividadesGenerales;
