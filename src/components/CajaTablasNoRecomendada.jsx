import React, { useState, useEffect } from 'react';
import TablaTemperatura from './TablaTemperatura.jsx';
import TablaClima from './TablaClima.jsx';
import TablaAmbos from './TablaAmbos.jsx';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CajaTablasNoRecomendadas = () => {
  const [tab, setTab] = useState('temperatura');
  const [elementos, setElementos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clima, setClima] = useState('');
  const [temperatura, setTemperatura] = useState(null);
  const {user, userLocation, setTemp, setClimate } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setElementos([]);
  }, [tab]);
  // Obtener clima actual
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!userLocation?.lat || !userLocation?.lon) return;
      try {
        const response = await fetch('http://localhost:3000/weather/hourly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: userLocation.lat, lon: userLocation.lon }),
        });
        const data = await response.json();
        if (data.hourly && data.hourly.length > 0) {
          const currentWeather = data.hourly[0];
          setTemperatura(Math.round(currentWeather.main.temp));
          setTemp(Math.round(currentWeather.main.temp));
          setClima(currentWeather.weather[0].main);
          setClimate(currentWeather.weather[0].main);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeatherData();
  }, [userLocation]);

  // Obtener actividades no recomendadas
  useEffect(() => {
    const fetchActividades = async () => {
      if (!temperatura && !clima) return;
      setLoading(true);

      let url = `http://localhost:3000/user-preferences/notrecommended/${user.id}`;
      const params = [];
      if (temperatura !== null && (tab === 'temperatura' || tab === 'ambos')) params.push(`temperatura=${temperatura}`);
      if (clima && (tab === 'clima' || tab === 'ambos')) params.push(`clima=${clima}`);
      if (params.length) url += `?${params.join('&')}`;

      console.log('Fetching actividades no recomendadas from:', url);
      
      try {
        const response = await fetch(url);
        console.log('Fetched', response);
        const data = await response.json();
        console.log('response to json', data);
        // Aquí puedes actualizar el estado con las actividades no recomendadas
        setElementos(data.notRecommended || []);
        console.log('elementos', elementos);
      } catch (error) {
        console.error('Error fetching actividades no recomendadas:', error);
        setElementos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActividades();
  }, [user, tab, temperatura, clima]);

  const getClimaEspanol = (weatherMain) => {
    const mapa = {
      'Clear': 'Despejado', 'Clouds': 'Nublado', 'Rain': 'Lluvioso',
      'Drizzle': 'Llovizna', 'Thunderstorm': 'Tormenta',
      'Snow': 'Nieve', 'Mist': 'Neblina', 'Fog': 'Niebla'
    };
    return mapa[weatherMain] || weatherMain;
  };

  const titulo = (tab === 'temperatura' && temperatura !== null)
    ? `Actividades no recomendadas para ${temperatura}°C`
    : (tab === 'clima' && clima)
    ? `Actividades no recomendadas para clima ${getClimaEspanol(clima)}`
    : (tab === 'ambos' && temperatura !== null && clima)
    ? `Actividades no recomendadas para ${temperatura}°C y clima ${getClimaEspanol(clima)}`
    : '';

  const elementosFormateados = elementos.map(act => ({
    id: act.actividades.id,
    nombre: act.actividades.nombre,
    descripcion: act.actividades.descripcion || 'Sin descripción',
    tipo: act.actividades.tipo,
    temperaturaIdeal: (act.min_temp + act.max_temp) / 2,
    temperaturaMin: act.min_temp,
    temperaturaMax: act.max_temp,
    climaIdeal: [
      act.prefiere_soleado && 'Clear',
      act.prefiere_nublado && 'Clouds',
      act.prefiere_lluvia && 'Rain'
    ].filter(Boolean)
  }));

  return (
    <div className="contenedor-preferencias-y-tabla">
      <div className="barra-preferencias">
        <button className={`pref-btn ${tab === 'temperatura' ? 'active' : ''}`} onClick={() => setTab('temperatura')}>Temperatura</button>
        <button className={`pref-btn ${tab === 'clima' ? 'active' : ''}`} onClick={() => setTab('clima')}>Clima</button>
        <button className={`pref-btn ${tab === 'ambos' ? 'active' : ''}`} onClick={() => setTab('ambos')}>Ambos</button>
      </div>

      <h2 className="titulo">{titulo}</h2>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'white' }}>Cargando actividades no recomendadas...</p>
      ) : (
        <div className="tarjetas-grid">
          {elementosFormateados.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'white' }}>
              No se encontraron actividades no recomendadas para las condiciones actuales.
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

      {/* Botón Más Actividades */}
      <button className="boton-mas-actividades" onClick={() => navigate('/mas-actividades')}>
        Más actividades
      </button>
    </div>
  );
};

export default CajaTablasNoRecomendadas;
