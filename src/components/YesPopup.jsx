import xImage from '../assets/x.svg';
import ZonaHoraria from './ZonaHoraria.jsx';
import CajaHoraria from './CajaHoraria.jsx';
import React, { useState } from 'react';
import Ubicacion3 from './Ubicacion3.jsx';

function YesPopup(props) {
    const Santiago = { name: "Santiago", lat: -33.45, lon: -70.64 };
    const [sel_lat, setlat] = useState(Santiago.lat);
    const [sel_lon, setlon] = useState(Santiago.lon);
    const [showUbicacionPopup, setShowUbicacionPopup] = useState(false);

return (
    <div className="yespopup-card">
        <div className="yespopup-main-row">
            <div className="yespopup-header">
                <span className="header-text">
                    Bienvenido, {props.name}!
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