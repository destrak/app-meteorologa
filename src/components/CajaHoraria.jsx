import { useEffect, useState } from "react";
import CajaDia from "./CajaDia";
import CajaHora from "./CajaHora";

function CajaHoraria({ lat, lon }) {
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState(null);
  const [horas, setHoras] = useState([]);
  const [dias, setDias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!lat || !lon) {
        console.log("lat or lon is undefined, skipping fetch");
        return; 
      }

      setLoading(true);
      setError(null);

      try {
        // Llamar al endpoint del backend para datos horarios
        const responseHourly = await fetch('http://localhost:3000/weather/hourly', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lat, lon })
        });
        
        if (!responseHourly.ok) {
          throw new Error('Error al obtener datos horarios');
        }
        
        const hourlyResult = await responseHourly.json();
        
        // Llamar al endpoint del backend para datos diarios
        const responseDaily = await fetch('http://localhost:3000/weather/daily', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lat, lon })
        });
        
        if (!responseDaily.ok) {
          throw new Error('Error al obtener datos diarios');
        }
        
        const dailyData = await responseDaily.json();
        
        // Establecer los datos
        setHoras(hourlyResult.hourly || []);
        setDias(dailyData);
        setCityName(hourlyResult.city?.name || 'Ubicación actual');
        
      } catch (err) {
        setError(err);
        console.error('Error fetching weather data:', err);
      } finally {    
        setLoading(false);
      }
    };
    fetchData();
  }, [lat, lon]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-blue-100 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold mb-4">Pronóstico</h1>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          <p className="text-lg">Mostrando resultados para: <strong>{cityName}</strong></p>
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