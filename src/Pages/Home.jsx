import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarNav from '../components/BarNav';
import UbicationQuery from '../components/UbicationQuery';
import ActividadesRecomendadas from '../components/ActividadesRecomendadas';
import CajaTablasNoRecomendadas from '../components/CajaTablasNoRecomendada';
import CajaDiaVertical from '../components/CajadiaVertical';
import iconoCerrar from '../assets/x.svg';
import YesPopup from '../components/YesPopup';
import { useUser } from '../context/UserContext';

function Home() {
  const [mostrarUbicacion, setMostrarUbicacion] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const userName =
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] ||
    'Usuario';

  const diaSimulado = {
    icon: '01d',
    date: '25-06-2025',
    precipitation: 20,
    maxTemp: 28,
    minTemp: 15
  };

  return (
    <>
      <BarNav />

      <div className="contenedor-home">
        {/* Sección superior con clima y recomendadas */}
        <div className="seccion-superior">
          <div className="columna-izquierda">
            {/* Mensaje de bienvenida dentro de la tarjeta de clima */}
            <div className="tarjeta-bienvenida-clima">
              <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>
                Bienvenido, {userName}!
              </h3>
              <CajaDiaVertical onVerPronostico={() => navigate('/pronostico')} />
            </div>
          </div>

          <div className="columna-derecha">
            <div className="contenedor-tabla-recomendada">
              <ActividadesRecomendadas />
            </div>
          </div>
        </div>

        {/* Sección inferior con no recomendadas */}
        <div className="seccion-inferior">
          <div className="seccion-no-recomendadas">
            <h2>Actividades no recomendadas</h2>
            <CajaTablasNoRecomendadas />
          </div>
        </div>

              {/* Popup para cambiar ubicación */}

      </div>
    </>
  );
}

export default Home;
