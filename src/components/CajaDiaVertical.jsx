import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

function CajaDiaVertical({ onCambiarUbicacion, onVerPronostico }) {
  const { userLocation, setTemp, setClimate } = useUser();
  const [dia, setDia] = useState(null);

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
  }, [userLocation]);

  const fechaFormateada = dia?.date || 'Fecha desconocida';
  const iconoUrl = dia?.icon ? `https://openweathermap.org/img/wn/${dia.icon}@2x.png` : '';
  const probLluvia = dia?.precipitation !== undefined ? `${Math.floor(dia.precipitation)}% 💧` : 'N/A';
  const tempMax = dia?.maxTemp !== undefined ? Math.floor(dia.maxTemp) : '?';
  const tempMin = dia?.minTemp !== undefined ? Math.floor(dia.minTemp) : '?';

  return (
    <div className="caja-dia-vertical">
      {onCambiarUbicacion && (
        <button className="boton-secundario" onClick={onCambiarUbicacion}>
          Cambiar ubicación
        </button>
      )}

      {iconoUrl && (
        <img src={iconoUrl} alt="Icono del clima" className="icono-clima-vertical" />
      )}

      <span className="dia-fecha">{fechaFormateada}</span>
      <span className="dia-lluvia">{probLluvia}</span>
      <span className="dia-temp">{tempMax}° / {tempMin}°</span>

      {onVerPronostico && (
        <button className="boton-pronostico" onClick={onVerPronostico}>
          Ver más pronósticos
        </button>
      )}
    </div>
  );
}

export default CajaDiaVertical;
