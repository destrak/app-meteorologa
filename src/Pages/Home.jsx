import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarNav from '../components/BarNav';
import UbicationQuery from '../components/UbicationQuery';
import GridActividadesHome from '../components/GridActividadesHome';
import CajaTablasNoRecomendadas from '../components/CajaTablasNoRecomendada';
import CajaDiaVertical from '../components/CajadiaVertical';
import iconoCerrar from '../assets/x.svg';
import YesPopup from '../components/YesPopup';
import { useUser } from '../context/UserContext';

function Home() {
  const [mostrarUbicacion, setMostrarUbicacion] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const navigate = useNavigate();
  const { user, userLocation, favoriteCity, updateUserLocation } = useUser();

  const userName =
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] ||
    'Usuario';

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
              <GridActividadesHome />
            </div>
          </div>
        </div>


              {/* Popup para cambiar ubicación */}

      </div>
    </>
  );
}

export default Home;
