import { useEffect, useState } from "react"

function WeatherCard({ lat, lon }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (lat == null || lon == null) {
        setError("Coordenadas no válidas");
        return;
      }
  
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener el clima");
          return res.json();
        })
        .then((data) => setWeather(data))
        .catch((err) => setError(err.message));
    }, [lat, lon]);
  
    if (error) {
      return (
        <div className="weather-card error">
          <p>:x: {error}</p>
        </div>
      );
    }
  
    if (!weather) {
      return (
        <div className="weather-card loading">
          <p>:arrows_counterclockwise: Cargando...</p>
        </div>
      );
    }
  
    return (
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <p>:thermometer: {weather.main.temp} °C</p>
        <p>{weather.weather?.[0]?.description.toUpperCase()}</p>
      </div>
    );
  }
  
  export default WeatherCard;