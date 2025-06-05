import xImage from '../assets/x.svg';
import ZonaHoraria from './ZonaHoraria.jsx';
import CajaHoraria from './CajaHoraria.jsx';
import React, { useState, useEffect } from 'react';
import Ubicacion3 from './Ubicacion3.jsx';
import { useUser } from '../context/UserContext';

function YesPopup(props) {
    const { user, userLocation } = useUser();
    const [sel_lat, setlat] = useState(userLocation.lat);
    const [sel_lon, setlon] = useState(userLocation.lon);
    const [showUbicacionPopup, setShowUbicacionPopup] = useState(false);
    
    // Actualizar las coordenadas cuando cambie la ubicación del usuario
    useEffect(() => {
        setlat(userLocation.lat);
        setlon(userLocation.lon);
    }, [userLocation]);

    // Usar el nombre del usuario del contexto si está disponible
    const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || props.name;

return (
    <div className="yespopup-card">
        <div className="yespopup-main-row">
            <div className="yespopup-header">
                <span className="header-text">
                    Bienvenido, {userName}!
                </span>
                <ZonaHoraria />
                <button
                    className="ubicacion-popup-open-btn"
                    onClick={() => setShowUbicacionPopup(true)}
                >
                    Cambiar ubicación
                </button>
            </div>
            <div className="yespopup-weather-row">
                <CajaHoraria lat={sel_lat} lon={sel_lon} />
            </div>
        </div>
        <div className="yespopup-divider" />
        {showUbicacionPopup && (
            <div className="ubicacion3-popup-overlay">
                <div className="ubicacion3-popup">
                    <button
                        className="close-btn"
                        onClick={() => setShowUbicacionPopup(false)}
                    >
                        <img src={xImage} alt="Cerrar" />
                    </button>
                    <h2 className="popup-title">Elige tu ciudad</h2>
                    <Ubicacion3
                        onlat={lat => {
                            setlat(lat);
                            setShowUbicacionPopup(false);
                        }}
                        onlon={lon => setlon(lon)}
                    />
                </div>
            </div>
        )}
    </div>
);
}
export default YesPopup;