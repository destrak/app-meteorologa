import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import SeleccionaUbicacion from './SeleccionaUbicacion.jsx';

function CajaDiaVertical({ onVerPronostico }) {
  const { userLocation, setTemp, setClimate, favoriteCity, updateUserLocation } = useUser();
  const [dia, setDia] = useState(null);
  const [showUbicacionPopup, setShowUbicacionPopup] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!userLocation?.lat || !userLocation?.lon) return;

      try {
        const response = await fetch('http://localhost:3000/weather/hourly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: userLocation.lat, lon: userLocation.lon })
        });

        if (response.ok) {
          const data = await response.json();
          const climaActual = data.hourly[0];

          const nuevoDia = {
            icon: climaActual.weather[0].icon,
            date: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            precipitation: climaActual.pop * 100,
            maxTemp: climaActual.main.temp_max,
            minTemp: climaActual.main.temp_min
          };

          setDia(nuevoDia);
          setTemp(Math.round(climaActual.main.temp));
          setClimate(climaActual.weather[0].main);
        }
      } catch (error) {
        console.error('Error al obtener el clima:', error);
      }
    };

    fetchWeatherData();
  }, [userLocation, setTemp, setClimate]);

  const fechaFormateada = dia?.date || 'Fecha desconocida';
  const iconoUrl = dia?.icon ? `https://openweathermap.org/img/wn/${dia.icon}@2x.png` : '';
  const probLluvia = dia?.precipitation !== undefined ? `${Math.floor(dia.precipitation)}% 💧` : 'N/A';
  const tempMax = dia?.maxTemp !== undefined ? Math.floor(dia.maxTemp) : '?';
  const tempMin = dia?.minTemp !== undefined ? Math.floor(dia.minTemp) : '?';

  // Función para usar ubicación favorita
  const usarUbicacionFavorita = () => {
    if (favoriteCity) {
      const favoriteLocation = {
        lat: favoriteCity.lat,
        lon: favoriteCity.lon,
        city: favoriteCity.nombre,
        country: favoriteCity.country
      };
      updateUserLocation(favoriteLocation);
    }
  };

  return (
    <div className="caja-dia-vertical">
      <div style={{ color: 'white', textAlign: 'center', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
        {userLocation.city}
        {userLocation.country && `, ${userLocation.country}`}
      </div>

      {iconoUrl && (
        <img src={iconoUrl} alt="Icono del clima" className="icono-clima-vertical" />
      )}

      <span className="dia-fecha">{fechaFormateada}</span>
      <span className="dia-lluvia">{probLluvia}</span>
      <span className="dia-temp">{tempMax}° / {tempMin}°</span>

      <div className="caja-botones-verticales">
        <button
          className="boton-caja-vertical"
          onClick={() => setShowUbicacionPopup(true)}
        >
          Cambiar ubicación
        </button>
        
        {favoriteCity && (
          <button
            className="boton-caja-vertical"
            onClick={usarUbicacionFavorita}
          >
            Usar ubicación favorita
          </button>
        )}

        {onVerPronostico && (
          <button 
            className="boton-caja-vertical" 
            onClick={onVerPronostico}
          >
            Ver más pronósticos
          </button>
        )}
      </div>
      
      <div className="yespopup-divider" />
      {showUbicacionPopup && (
        <SeleccionaUbicacion onClose={() => setShowUbicacionPopup(false)} />
      )}
    </div>
  );
}

export default CajaDiaVertical;