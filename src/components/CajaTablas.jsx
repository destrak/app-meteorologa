import React, { useState } from 'react';
import TablaTemperatura from './TablaTemperatura.jsx';
import TablaClima from './TablaClima.jsx';
import TablaAmbos from './TablaAmbos.jsx';

const CajaTablas = () => {
  const [tab, setTab] = useState('temperatura');

  // Datos simulados
  const clima = 'Clouds'; // Ej: 'Rain', 'Clouds', etc.
  const temperatura = 20; // °C

  const elementos = [
    {
      nombre: 'Refugio de Montaña',
      descripcion: 'Caminata en nieve y frío extremo.',
      tiempo: '3 horas',
      temperaturaIdeal: 5,
      climaIdeal: ['Snow']
    },
    {
      nombre: 'Playa Brava',
      descripcion: 'Relajarse en la playa.',
      tiempo: 'Medio día',
      temperaturaIdeal: 28,
      climaIdeal: ['Clear']
    },
    {
      nombre: 'Museo Nacional',
      descripcion: 'Recorrido por salas culturales.',
      tiempo: '1.5 horas',
      temperaturaIdeal: 10,
      climaIdeal: ['Rain', 'Clouds']
    },
    {
      nombre: 'Parque Urbano',
      descripcion: 'Paseo en áreas verdes de la ciudad.',
      tiempo: '2 horas',
      temperaturaIdeal: 20,
      climaIdeal: ['Clear', 'Clouds']
    }
  ];

  // Título dinámico
  let titulo = '';
  if (tab === 'temperatura') {
    titulo = `Actividades para ${temperatura}°C`;
  } else if (tab === 'clima') {
    titulo = `Actividades para clima: ${clima}`;
  } else if (tab === 'ambos') {
    titulo = `Actividades para ${temperatura}°C y clima ${clima}`;
  }

  return (
    <div className="contenedor-preferencias-y-tabla">
      <div className="barra-preferencias">
        <button className={`pref-btn ${tab === 'temperatura' ? 'active' : ''}`} onClick={() => setTab('temperatura')}>
          Por Temperatura
        </button>
        <button className={`pref-btn ${tab === 'clima' ? 'active' : ''}`} onClick={() => setTab('clima')}>
          Por Clima
        </button>
        <button className={`pref-btn ${tab === 'ambos' ? 'active' : ''}`} onClick={() => setTab('ambos')}>
          Clima y Temperatura
        </button>
      </div>

      <h2 className="titulo">{titulo}</h2>

      <div className="tarjetas-grid">
        {tab === 'temperatura' && (
          <TablaTemperatura temperaturaActual={temperatura} elementos={elementos} />
        )}
        {tab === 'clima' && (
          <TablaClima climaActual={clima} elementos={elementos} />
        )}
        {tab === 'ambos' && (
          <TablaAmbos climaActual={clima} temperaturaActual={temperatura} elementos={elementos} />
        )}
      </div>
    </div>
  );
};

export default CajaTablas;
