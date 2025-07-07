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
    <div className="contenedor-pronostico">
      <div className="pronostico-header">
        <h1 className="pronostico-titulo">Pronóstico del Tiempo</h1>
        {!loading && (
          <p className="pronostico-ubicacion">
            📍 <strong>{cityName}</strong>
          </p>
        )}
      </div>

      {loading ? (
        <div className="pronostico-loading">
          <p>Cargando datos del clima...</p>
        </div>
      ) : (
        <div className="pronostico-contenido">
          <div className="seccion-horaria">
            <h2 className="seccion-titulo">Próximas Horas</h2>
            <div className="tiempo_hora_contenedor_mejorado">
              {horas.map(hora => (
                <CajaHora hora={hora} key={hora.dt} />
              ))}
            </div>
          </div>
          
          <div className="seccion-diaria">
            <h2 className="seccion-titulo">Próximos Días</h2>
            <div className="tiempo_dias_contenedor">
              {dias.map(dia => (
                <CajaDia dia={dia} key={dia.date}/>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CajaHoraria;