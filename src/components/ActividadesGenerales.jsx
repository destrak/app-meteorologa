import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalEditarPreferencia from './ModalEditarPreferencia';
import ModalEditarActividadPersonalizada from './ModalEditarActividadPersonalizada';
import ModalCrearActividadPersonalizada from './ModalCrearActividadPersonalizada';

function ActividadesGenerales() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [actividadesPreferencias, setActividadesPreferencias] = useState([]);
  const [actividadesPersonalizadas, setActividadesPersonalizadas] = useState([]);
  const [actividadAEditar, setActividadAEditar] = useState(null);
  const [actividadPersonalizadaAEditar, setActividadPersonalizadaAEditar] = useState(null);
  const [nuevaActividadPersonalizada, setNuevaActividadPersonalizada] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      // Cargar preferencias de actividades de la plataforma
      fetch(`http://localhost:3000/user-preferences/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.preferences) {
            setActividadesPreferencias(
              data.preferences
                .map(pref => ({
                  titulo: pref.actividades.nombre || 'Sin título',
                  nombre: pref.actividades.nombre || 'Sin título',
                  duracion: pref.actividades.duracion || 'X horas',
                  tipo: pref.actividades.tipo || 'Desconocida',
                  descripcion: pref.actividades.descripcion || 'Sin descripción',
                  temperatura_min: pref.min_temp,
                  temperatura_max: pref.max_temp,
                  soleado: pref.prefiere_soleado,
                  nublado: pref.prefiere_nublado,
                  lluvia: pref.prefiere_lluvia,
                  idPreferencia: pref.id,
                  esPreferencia: true // Flag para identificar que es una preferencia
                }))
            );
          }
        })
        .catch(err => {
          console.error('Error al obtener preferencias:', err);
        });

      // Cargar actividades personalizadas del usuario
      fetch(`http://localhost:3000/actividades-personalizadas/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.activities) {
            setActividadesPersonalizadas(
              data.activities
                .map(act => ({
                  titulo: act.nombre,
                  nombre: act.nombre,
                  duracion: 'Variable',
                  tipo: act.tipo,
                  descripcion: act.descripcion || 'Sin descripción',
                  temperatura_min: act.temperatura_min,
                  temperatura_max: act.temperatura_max,
                  soleado: act.prefiere_soleado,
                  nublado: act.prefiere_nublado,
                  lluvia: act.prefiere_lluvia,
                  idActividadPersonalizada: act.id,
                  esPersonalizada: true, // Flag para identificar que es personalizada
                  creadoEn: act.creado_en
                }))
            );
          }
        })
        .catch(err => {
          console.error('Error al obtener actividades personalizadas:', err);
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

  // Manejar edición de preferencias (actividades de la plataforma)
  const handleEditarGuardarPreferencia = (editada) => {
    setActividadesPreferencias(prev =>
      prev.map(act =>
        act.idPreferencia === editada.idPreferencia ? editada : act
      )
    );
  };

  // Manejar edición de actividades personalizadas
  const handleEditarGuardarPersonalizada = (editada) => {
    setActividadesPersonalizadas(prev =>
      prev.map(act =>
        act.idActividadPersonalizada === editada.idActividadPersonalizada ? editada : act
      )
    );
  };

  // Manejar eliminación de actividades personalizadas
  const handleEliminarPersonalizada = async (idActividadPersonalizada) => {
    try {
      const response = await fetch(`http://localhost:3000/actividades-personalizadas/${idActividadPersonalizada}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setActividadesPersonalizadas(prev =>
          prev.filter(act => act.idActividadPersonalizada !== idActividadPersonalizada)
        );
      } else {
        console.error('Error al eliminar actividad personalizada');
      }
    } catch (error) {
      console.error('Error al eliminar actividad personalizada:', error);
    }
  };


  const handleNuevaActividadPersonalizada = (nuevaActividad) => {
    setActividadesPersonalizadas(prev => [...prev, nuevaActividad]);
    setNuevaActividadPersonalizada(false);
  };

  return (
    <div className="actividades-container">
      <h2 className="actividades-titulo">Todas tus actividades</h2>

      {/* Actividades de la Plataforma */}
      <h3 className="actividades-subtitulo">Actividades de la Plataforma</h3>
      <div className="actividades-lista">
        {actividadesPreferencias.length > 0 ? (
          actividadesPreferencias.map((actividad, idx) => (
            <ActividadItem
              key={`pref-${idx}`}
              {...actividad}
              tipoEdicion="preferencia"
              onEditar={() => setActividadAEditar(actividad)}
            />
          ))
        ) : (
          <p className="lista-vacia">No tienes actividades de la plataforma en tus preferencias</p>
        )}
      </div>

      {/* Separador */}
      <div className="separador-actividades"></div>

      {/* Mis Actividades Personalizadas */}
      <h3 className="actividades-subtitulo">Mis Actividades Personalizadas</h3>
      <div className="actividades-lista">
        {actividadesPersonalizadas.length > 0 ? (
          actividadesPersonalizadas.map((actividad, idx) => (
            <ActividadItem
              key={`pers-${idx}`}
              {...actividad}
              tipoEdicion="personalizada"
              onEditar={() => setActividadPersonalizadaAEditar(actividad)}
              onEliminar={() => handleEliminarPersonalizada(actividad.idActividadPersonalizada)}
            />
          ))
        ) : (
          <p className="lista-vacia">No has creado actividades personalizadas aún</p>
        )}
      </div>

      <div className="botones-de-preferencias">
        <button className="boton-nueva-actividad" onClick={() => setNuevaActividadPersonalizada(true)}>
          Crear actividad
        </button>
        <button className="boton-preferencias" onClick={irAPreferencias}>
          Modificar preferencias
        </button>
      </div>

      {/* Modales */}
      {actividadAEditar && (
        <ModalEditarPreferencia
          actividad={actividadAEditar}
          onClose={() => setActividadAEditar(null)}
          onGuardar={handleEditarGuardarPreferencia}
        />
      )}

      {nuevaActividadPersonalizada && (
        <ModalCrearActividadPersonalizada
          onClose={() => setNuevaActividadPersonalizada(false)}
          onCrear={handleNuevaActividadPersonalizada}
        />
      )}

      {actividadPersonalizadaAEditar && (
        <ModalEditarActividadPersonalizada
          actividad={actividadPersonalizadaAEditar}
          onClose={() => setActividadPersonalizadaAEditar(null)}
          onGuardar={handleEditarGuardarPersonalizada}
        />
      )}
    </div>
  );
}

function ActividadItem({ titulo, duracion, tipo, descripcion, tipoEdicion, onEditar, onEliminar, temperatura_min, temperatura_max, soleado, nublado, lluvia }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className={`actividad-item ${tipoEdicion === 'personalizada' ? 'actividad-personalizada' : 'actividad-preferencia'} ${expandido ? 'expandido' : ''}`} 
         onClick={() => setExpandido(!expandido)}>
      <div className="actividad-header">
        {titulo}
        {tipoEdicion === 'personalizada' && <span className="badge-personalizada">Personalizada</span>}
      </div>
      <div className="actividad-meta">
        {duracion} — Tipo: {tipo}
        {temperatura_min !== undefined && temperatura_max !== undefined && (
          <span> — Temp: {temperatura_min}°C - {temperatura_max}°C</span>
        )}
      </div>
      {expandido && (
        <div className="actividad-descripcion">
          {descripcion}
          
          {/* Mostrar preferencias climáticas */}
          <div className="clima-preferencias">
            {soleado && <span className="clima-tag soleado">☀️ Soleado</span>}
            {nublado && <span className="clima-tag nublado">☁️ Nublado</span>}
            {lluvia && <span className="clima-tag lluvia">🌧️ Lluvia</span>}
          </div>
          
          <div className="actividad-acciones">
            <button
              className="editar-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEditar();
              }}
            >
              {tipoEdicion === 'personalizada' ? 'Editar Completo' : 'Editar Preferencias'}
            </button>
            
            {tipoEdicion === 'personalizada' && onEliminar && (
              <button
                className="eliminar-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad personalizada?')) {
                    onEliminar();
                  }
                }}
              >
                🗑️ Eliminar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActividadesGenerales;
