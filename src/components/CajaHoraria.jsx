import { useEffect, useState } from "react";
import CajaDia from "./CajaDia";
import CajaHora from "./CajaHora";
import getDailyForecasts from "./getDailyForecast";

function CajaHoraria({ lat, lon }) {
  const [dataF, setDataForecast] = useState(null);
  const [error, setError] = useState(null);
  const [horas, setHoras] = useState([]);
  const [dias, setDias] = useState([]);
  const [loading, setLoading] = useState(true);
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  
  useEffect(() => {
    const fetchData = async () => {
      if (!lat || !lon) {
        console.log("lat or lon is undefined, skipping fetch");
        return; 
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&cnt=80`
        const responseF = await fetch(apiUrl);
        const jsonF = await responseF.json();
        setDataForecast(jsonF);
      } catch (err) {
        setError(err);
      } finally {    
        setLoading(false);
      }
    };
    fetchData();
  }, [lat, lon]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  useEffect(() => {
    if (dataF) {
      const daily = getDailyForecasts(dataF.list);
      const forecast = daily.slice(1)
      setDias(forecast);
      setHoras(dataF.list.slice (0, 7));
    }
  }, [dataF]);
  

  return (
    <div className="p-6 bg-blue-100 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold mb-4">Pronóstico</h1>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          <p className="text-lg">Mostrando resultados para: <strong>{dataF.city.name}</strong></p>
          <div className="caja-horaria-y-dia">  
            <div className="tiempo_hora_contenedor">
              {horas.map(hora => (
                <CajaHora hora={hora} key={hora.dt} />
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
              {dias.map(dia => (
                <CajaDia dia={dia} key={dia.date}/>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CajaHoraria;
