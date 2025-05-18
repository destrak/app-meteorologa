import React from 'react';
import ActividadItem from './ActividadItem';
import { Link } from 'react-router-dom';


const ActividadesRecomendadas = ({ onCambiarPreferencias }) => {
const actividades = [
  {
    titulo: 'Senderismo en Naturaleza',
    duracion: '1 hora',
    dificultad: 'Media',
    descripcion: 'Explora senderos rodeados de árboles y aire puro. Ideal para mejorar tu estado físico y reducir el estrés.',
  },
  {
    titulo: 'Meditación Guiada',
    duracion: '20 minutos',
    dificultad: 'Baja',
    descripcion: 'Una sesión de meditación paso a paso para calmar la mente, mejorar la concentración y conectar contigo mismo.',
  },
  {
    titulo: 'Entrenamiento HIIT',
    duracion: '30 minutos',
    dificultad: 'Alta',
    descripcion: 'Ejercicio de intervalos de alta intensidad para quemar grasa y aumentar tu resistencia cardiovascular en poco tiempo.',
  },
  {
    titulo: 'Clase de Baile Latino',
    duracion: '45 minutos',
    dificultad: 'Media',
    descripcion: 'Aprende pasos básicos de salsa, bachata o merengue mientras te diviertes y quemas calorías.',
  },
  {
    titulo: 'Rutina de Estiramiento',
    duracion: '15 minutos',
    dificultad: 'Baja',
    descripcion: 'Perfecto para después de un día largo. Alivia tensiones musculares y mejora tu flexibilidad con movimientos suaves.',
  },
  {
    titulo: 'Pilates para Principiantes',
    duracion: '40 minutos',
    dificultad: 'Media',
    descripcion: 'Fortalece tu núcleo, mejora tu postura y equilibrio con esta rutina enfocada en control corporal y respiración.',
  },
];

  return (
    <div className="actividades-container">
      <h1 className="actividades-titulo">Actividades Recomendadas</h1>

      <div className="actividades-lista">
        {actividades.map((actividad, index) => (
          <ActividadItem
            key={index}
            titulo={actividad.titulo}
            duracion={actividad.duracion}
            dificultad={actividad.dificultad}
            descripcion={actividad.descripcion}
          />
        ))}
      </div>

       <Link to="/preguntas" className="boton-negro" onClick={() => setShowMenu(false)}>
         Cambiar Preferencias
      </Link>
    </div>
  );
};

export default ActividadesRecomendadas;
