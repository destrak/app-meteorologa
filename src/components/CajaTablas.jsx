import React, { useState, useEffect } from 'react';
import TablaTemperatura from './TablaTemperatura.jsx';
import TablaClima from './TablaClima.jsx';
import TablaAmbos from './TablaAmbos.jsx';
import { useUser } from '../context/UserContext';

const CajaTablas = () => {
  const [tab, setTab] = useState('temperatura');
  const [elementos, setElementos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clima, setClima] = useState('');
  const [temperatura, setTemperatura] = useState(null);
  const { userLocation, setTemp, setClimate } = useUser();

  // Obtener el clima actual del usuario
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!userLocation || !userLocation.lat || !userLocation.lon) return;
      
      try {
        const response = await fetch('http://localhost:3000/weather/hourly', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            lat: userLocation.lat, 
            lon: userLocation.lon 
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.hourly && data.hourly.length > 0) {
            // Obtener el clima y temperatura actuales del primer elemento
            const currentWeather = data.hourly[0];
            setTemperatura(Math.round(currentWeather.main.temp));
            setTemp(Math.round(currentWeather.main.temp));
            setClima(currentWeather.weather[0].main); // "Clear", "Clouds", "Rain", etc.
            setClimate(currentWeather.weather[0].main);
          }
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeatherData();
  }, [userLocation]);

  // Obtener actividades según el filtro seleccionado
  useEffect(() => {
    const fetchActividades = async () => {
      if (!temperatura && !clima) return;
      
      setLoading(true);
      let url = 'http://localhost:3000/activities/filter?';
      
      // Construir la URL según el tab seleccionado
      if (tab === 'temperatura' && temperatura !== null) {
        url += `temperatura=${temperatura}`;
      } else if (tab === 'clima' && clima) {
        url += `clima=${clima}`;
      } else if (tab === 'ambos' && temperatura !== null && clima) {
        url += `temperatura=${temperatura}&clima=${clima}`;
      }
      
      try {
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setElementos(data.activities || []);
        } else {
          console.error('Error fetching activities');
          setElementos([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setElementos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, [tab, temperatura, clima]);

  // Mapear el clima a español para mostrar
  const getClimaEspanol = (weatherMain) => {
    const mapaClima = {
      'Clear': 'Despejado',
      'Clouds': 'Nublado',
      'Rain': 'Lluvioso',
      'Drizzle': 'Llovizna',
      'Thunderstorm': 'Tormenta',
      'Snow': 'Nieve',
      'Mist': 'Neblina',
      'Fog': 'Niebla'
    };
    return mapaClima[weatherMain] || weatherMain;
  };

  // Título dinámico
  let titulo = '';
  if (tab === 'temperatura' && temperatura !== null) {
    titulo = `Actividades para ${temperatura}°C`;
  } else if (tab === 'clima' && clima) {
    titulo = `Actividades para clima: ${getClimaEspanol(clima)}`;
  } else if (tab === 'ambos' && temperatura !== null && clima) {
    titulo = `Actividades para ${temperatura}°C y clima ${getClimaEspanol(clima)}`;
  }

  // Transformar los datos para los componentes de tabla
  const elementosFormateados = elementos.map(actividad => ({
    id: actividad.id,
    nombre: actividad.nombre,
    descripcion: actividad.descripcion || 'Sin descripción',
    tipo: actividad.tipo,
    temperaturaIdeal: (actividad.min_temp + actividad.max_temp) / 2,
    temperaturaMin: actividad.min_temp,
    temperaturaMax: actividad.max_temp,
    climaIdeal: [
      actividad.prefiere_soleado && 'Clear',
      actividad.prefiere_nublado && 'Clouds',
      actividad.prefiere_lluvia && 'Rain'
    ].filter(Boolean)
  }));

  if (!temperatura && !clima) {
    return (
      <div className="contenedor-preferencias-y-tabla">
        <p style={{ textAlign: 'center', color: 'white' }}>Cargando datos del clima...</p>
      </div>
    );
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

      {loading ? (
        <p style={{ textAlign: 'center', color: 'white' }}>Cargando actividades...</p>
      ) : (
        <div className="tarjetas-grid">
          {elementosFormateados.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'white' }}>
              No se encontraron actividades para las condiciones actuales.
            </p>
          ) : (
            <>
              {tab === 'temperatura' && (
                <TablaTemperatura temperaturaActual={temperatura} elementos={elementosFormateados} />
              )}
              {tab === 'clima' && (
                <TablaClima climaActual={clima} elementos={elementosFormateados} />
              )}
              {tab === 'ambos' && (
                <TablaAmbos climaActual={clima} temperaturaActual={temperatura} elementos={elementosFormateados} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CajaTablas;