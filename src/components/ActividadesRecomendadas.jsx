import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActividadesRecomendadas() {
  const navigate = useNavigate();

  const actividades = [
    {
      titulo: 'Senderismo en Naturaleza',
      duracion: '1 hora',
      dificultad: 'Media',
      descripcion: 'Explora senderos rodeados de árboles y aire puro. Ideal para mejorar tu estado físico y reducir el estrés.'
    },
    {
      titulo: 'Meditación Guiada',
      duracion: '20 minutos',
      dificultad: 'Baja',
      descripcion: 'Una sesión de meditación paso a paso para calmar la mente, mejorar la concentración y conectar contigo mismo.'
    },
    {
      titulo: 'Entrenamiento HIIT',
      duracion: '30 minutos',
      dificultad: 'Alta',
      descripcion: 'Ejercicio de intervalos de alta intensidad para quemar grasa y aumentar tu resistencia cardiovascular en poco tiempo.'
    },
    {
      titulo: 'Clase de Baile Latino',
      duracion: '45 minutos',
      dificultad: 'Media',
      descripcion: 'Aprende pasos básicos de salsa, bachata o merengue mientras te diviertes y quemas calorías.'
    },
    {
      titulo: 'Rutina de Estiramiento',
      duracion: '15 minutos',
      dificultad: 'Baja',
      descripcion: 'Perfecto para después de un día largo. Alivia tensiones musculares y mejora tu flexibilidad con movimientos suaves.'
    }
  ];

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

function ActividadItem({ titulo, duracion, dificultad, descripcion }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="actividad-item" onClick={() => setExpandido(!expandido)}>
      <div className="actividad-header">{titulo}</div>
      <div className="actividad-meta">
        {duracion} — Dificultad: {dificultad}
      </div>
      {expandido && (
        <div className="actividad-descripcion">{descripcion}</div>
      )}
    </div>
  );
}

export default ActividadesRecomendadas;
