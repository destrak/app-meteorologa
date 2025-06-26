import React, { useEffect, useState } from 'react';
import CajaDia from './CajaDia';
import xImage from '../assets/x.svg';
import ZonaHoraria from './ZonaHoraria.jsx';
import CajaHoraria from './CajaHoraria.jsx';
import Ubicacion3 from './Ubicacion3.jsx';
import { useUser } from '../context/UserContext';

function ResumenClimaHoy({ ciudad }) {
  const [diaHoy, setDiaHoy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ciudad?.lat || !ciudad?.lon) return;

    const fetchClimaDiario = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/weather/daily', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: ciudad.lat, lon: ciudad.lon })
        });
        const data = await res.json();
        if (data && data.length > 0) {
          setDiaHoy(data[0]); // Solo el primer día
        }
      } catch (err) {
        console.error('Error al obtener clima del día:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClimaDiario();
  }, [ciudad]);

  return (
    <div className="resumen-clima-hoy">
      <h2 style={{ color: 'white' }}>Clima de hoy en {ciudad?.name}</h2>
      {loading ? (
        <p style={{ color: 'white' }}>Cargando...</p>
      ) : (
        diaHoy && <CajaDia dia={diaHoy} />
      )}
    </div>
  );
}

export default ResumenClimaHoy;
