import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function GridActividadesHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, temperatura, clima, setTemp, setClimate, userLocation } = useUser();
  const [todasActividades, setTodasActividades] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState('todas');
  const [climaActual, setClimaActual] = useState('');
  const [temperaturaActual, setTemperaturaActual] = useState(null);

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
            const currentWeather = data.hourly[0];
            setTemperaturaActual(Math.round(currentWeather.main.temp));
            setClimaActual(currentWeather.weather[0].main);
          }
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeatherData();
  }, [userLocation]);

  useEffect(() => {
    if (user && user.id) {
      const fetchAllActividades = async () => {
        try {
          // Cargar actividades recomendadas
          const recomendadasResponse = await fetch(`http://localhost:3000/user-preferences/filter/${user.id}?temperatura=${temperatura}&clima=${clima}`);
          const recomendadasData = await recomendadasResponse.json();
          
          // Cargar actividades NO recomendadas
          const noRecomendadasResponse = await fetch(`http://localhost:3000/user-preferences/notrecommended/${user.id}?temperatura=${temperatura}&clima=${clima}`);
          const noRecomendadasData = await noRecomendadasResponse.json();
          
          // Cargar actividades personalizadas
          const personalizadasResponse = await fetch(`http://localhost:3000/actividades-personalizadas/${user.id}`);
          const personalizadasData = await personalizadasResponse.json();
          
          const todasActividadesCombinadas = [];
          
          // Procesar recomendadas
          if (recomendadasData.preferences) {
            const recomendadas = recomendadasData.preferences
              .filter(pref => pref.actividades)
              .map(pref => ({
                titulo: pref.actividades.nombre || 'Sin título',
                duracion: pref.actividades.duracion || 'X horas',
                tipo: pref.actividades.tipo || 'Desconocida',
                descripcion: pref.actividades.descripcion || 'Sin descripción',
                temperatura_min: pref.min_temp,
                temperatura_max: pref.max_temp,
                soleado: pref.prefiere_soleado,
                nublado: pref.prefiere_nublado,
                lluvia: pref.prefiere_lluvia,
                esRecomendada: true,
                tipoActividad: 'preferencia'
              }));
            todasActividadesCombinadas.push(...recomendadas);
          }
          
          // Procesar NO recomendadas
          if (noRecomendadasData.notRecommended) {
            const noRecomendadas = noRecomendadasData.notRecommended
              .filter(pref => pref.actividades)
              .map(pref => {
                const motivos = [];
                
                // Verificar temperatura
                if (temperaturaActual && (temperaturaActual < pref.min_temp || temperaturaActual > pref.max_temp)) {
                  if (temperaturaActual < pref.min_temp) {
                    motivos.push('Temperatura muy baja');
                  } else {
                    motivos.push('Temperatura muy alta');
                  }
                }
                
                // Verificar clima
                if (climaActual) {
                  const climaNormalizado = climaActual.toLowerCase();
                  if (climaNormalizado.includes('clear') || climaNormalizado.includes('sun')) {
                    if (!pref.prefiere_soleado) {
                      motivos.push('Por el clima');
                    }
                  } else if (climaNormalizado.includes('cloud')) {
                    if (!pref.prefiere_nublado) {
                      motivos.push('Por el clima');
                    }
                  } else if (climaNormalizado.includes('rain')) {
                    if (!pref.prefiere_lluvia) {
                      motivos.push('Por el clima');
                    }
                  }
                }
                
                return {
                  titulo: pref.actividades.nombre || 'Sin título',
                  duracion: pref.actividades.duracion || 'X horas',
                  tipo: pref.actividades.tipo || 'Desconocida',
                  descripcion: pref.actividades.descripcion || 'Sin descripción',
                  temperatura_min: pref.min_temp,
                  temperatura_max: pref.max_temp,
                  soleado: pref.prefiere_soleado,
                  nublado: pref.prefiere_nublado,
                  lluvia: pref.prefiere_lluvia,
                  esRecomendada: false,
                  tipoActividad: 'preferencia',
                  motivoNoRecomendada: motivos.length > 0 ? motivos.join(' y ') : 'No cumple con los filtros actuales'
                };
              });
            todasActividadesCombinadas.push(...noRecomendadas);
          }
          
          // Procesar personalizadas (determinar si son recomendadas según filtros)
          if (personalizadasData.activities) {
            const personalizadas = personalizadasData.activities.map(act => {
              let esRecomendada = true;
              const motivos = [];
              
              // Verificar temperatura
              if (temperaturaActual && (temperaturaActual < act.temperatura_min || temperaturaActual > act.temperatura_max)) {
                esRecomendada = false;
                if (temperaturaActual < act.temperatura_min) {
                  motivos.push('Temperatura muy baja');
                } else {
                  motivos.push('Temperatura muy alta');
                }
              }
              
              // Verificar clima
              if (climaActual) {
                const climaNormalizado = climaActual.toLowerCase();
                if (climaNormalizado.includes('clear') || climaNormalizado.includes('sun')) {
                  if (!act.prefiere_soleado) {
                    esRecomendada = false;
                    motivos.push('Por el clima');
                  }
                } else if (climaNormalizado.includes('cloud')) {
                  if (!act.prefiere_nublado) {
                    esRecomendada = false;
                    motivos.push('Por el clima');
                  }
                } else if (climaNormalizado.includes('rain')) {
                  if (!act.prefiere_lluvia) {
                    esRecomendada = false;
                    motivos.push('Por el clima');
                  }
                }
              }
              
              return {
                titulo: act.nombre,
                duracion: 'Variable',
                tipo: act.tipo,
                descripcion: act.descripcion || 'Sin descripción',
                temperatura_min: act.temperatura_min,
                temperatura_max: act.temperatura_max,
                soleado: act.prefiere_soleado,
                nublado: act.prefiere_nublado,
                lluvia: act.prefiere_lluvia,
                esRecomendada,
                tipoActividad: 'personalizada',
                motivoNoRecomendada: motivos.length > 0 ? motivos.join(' y ') : null
              };
            });
            todasActividadesCombinadas.push(...personalizadas);
          }
          
          setTodasActividades(todasActividadesCombinadas);
        } catch (err) {
          console.error('Error fetching activities:', err);
        }
      };
      
      fetchAllActividades();
    }
  }, [user, temperatura, clima]);

  // Funciones para manejar filtros
  const handleFiltroTodas = () => {
    setFiltroActivo('todas');
    setTemp(null);
    setClimate('');
  };

  const handleFiltroTemperatura = () => {
    setFiltroActivo('temperatura');
    setTemp(temperaturaActual);
    setClimate('');
  };

  const handleFiltroClima = () => {
    setFiltroActivo('clima');
    setTemp(null);
    setClimate(climaActual);
  };

  const handleFiltroAmbos = () => {
    setFiltroActivo('ambos');
    setTemp(temperaturaActual);
    setClimate(climaActual);
  };

  // Función para traducir clima de inglés a español
  const getClimaEspanol = (weatherMain) => {
    const mapaClima = {
      'Clear': 'Despejado',
      'Clouds': 'Nublado',
      'Rain': 'Lluvioso',
      'Drizzle': 'Llovizna',
      'Thunderstorm': 'Tormenta',
      'Snow': 'Nieve',
      'Mist': 'Neblina',
      'Fog': 'Niebla',
      'Haze': 'Bruma'
    };
    return mapaClima[weatherMain] || weatherMain;
  };

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
      <h2 className="actividades-titulo">Todas tus actividades</h2>

      {/* Filtros */}
      <div className="filtros-container-home">
        <div className="filtros-grupo">
          <label>Filtrar por:</label>
          <div className="filtros-botones">
            <button 
              className={`filtro-btn ${filtroActivo === 'todas' ? 'activo' : ''}`}
              onClick={handleFiltroTodas}
            >
              Todas
            </button>
            <button 
              className={`filtro-btn ${filtroActivo === 'temperatura' ? 'activo' : ''}`}
              onClick={handleFiltroTemperatura}
              disabled={!temperaturaActual}
            >
              Por Temperatura
            </button>
            <button 
              className={`filtro-btn ${filtroActivo === 'clima' ? 'activo' : ''}`}
              onClick={handleFiltroClima}
              disabled={!climaActual}
            >
              Por Clima
            </button>
            <button 
              className={`filtro-btn ${filtroActivo === 'ambos' ? 'activo' : ''}`}
              onClick={handleFiltroAmbos}
              disabled={!temperaturaActual || !climaActual}
            >
              Temperatura + Clima
            </button>
          </div>
        </div>
        
        {/* Información del filtro activo */}
        <div className="filtro-info">
          {temperaturaActual && (temperatura !== null) && (
            <div className="filtro-detalle">
              <span>Temperatura: <strong>{temperaturaActual}°C</strong></span>
            </div>
          )}
          
          {climaActual && clima && (
            <div className="filtro-detalle">
              <span>Clima: <strong>{getClimaEspanol(climaActual)}</strong></span>
            </div>
          )}
        </div>
      </div>

      <div className="actividades-lista-home">
        {todasActividades.length > 0 ? (
          todasActividades.map((actividad, idx) => (
            <ActividadItemHome key={idx} {...actividad} />
          ))
        ) : (
          <p className="lista-vacia">No tienes actividades configuradas</p>
        )}
      </div>

      <div className="botones-de-preferencias">
        <button className="boton-preferencias" onClick={irAPreferencias}>
          Gestionar actividades
        </button>
      </div>
    </div>
  );
}

function ActividadItemHome({ 
  titulo, 
  duracion, 
  tipo, 
  descripcion, 
  tipoActividad, 
  esRecomendada, 
  motivoNoRecomendada,
  temperatura_min, 
  temperatura_max, 
  soleado, 
  nublado, 
  lluvia 
}) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div 
      className={`actividad-item-home ${esRecomendada ? 'recomendada' : 'no-recomendada'} ${expandido ? 'expandido' : ''}`} 
      onClick={() => setExpandido(!expandido)}
    >
      <div className="actividad-header">
        {titulo}
        <div className="badges-container">
          {tipoActividad === 'personalizada' && (
            <span className="badge-personalizada">Personalizada</span>
          )}
          {tipoActividad === 'preferencia' && (
            <span className="badge-preferencia">Preferencias</span>
          )}
        </div>
      </div>
      
      <div className="actividad-meta">
        {duracion} — Tipo: {tipo}
        {temperatura_min !== undefined && temperatura_max !== undefined && (
          <span> — Temp: {temperatura_min}°C - {temperatura_max}°C</span>
        )}
      </div>

      {!esRecomendada && motivoNoRecomendada && (
        <div className="motivo-no-recomendada">
          <strong>No recomendada: {motivoNoRecomendada}</strong>
        </div>
      )}

      {expandido && (
        <div className="actividad-descripcion">
          {descripcion}
          
          {/* Mostrar preferencias climáticas */}
          <div className="clima-preferencias">
            {soleado && <span className="clima-tag soleado">☀️ Soleado</span>}
            {nublado && <span className="clima-tag nublado">☁️ Nublado</span>}
            {lluvia && <span className="clima-tag lluvia">🌧️ Lluvia</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default GridActividadesHome;