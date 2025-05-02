import xImage from '../assets/x.svg';
import ZonaHoraria from '../ZonaHoraria.jsx';
import Ubicacion from './Ubicacion.jsx';
import CajaHoraria from './CajaHoraria.jsx';
import React, { useState } from 'react';


function YesPopup({ onClose }) {

    const usuario = "Lorem ipsum";
    const [sel_lat, setlat] = useState(null);
    const [sel_lon, setlon] = useState(null);
  
    const manejarSeleccionCiudad = (ciudad) => {
      setCiudadSeleccionada(ciudad);
    };
    
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-popup-button" onClick={onClose} alt="Cerrar">
                    <img src={xImage} alt="Cerrar" className="close-popup-icon" />
                </button>
                <div className="popup-clima-container">
                    <ZonaHoraria />
                    <Ubicacion onlat={setlat} onlon={setlon} />
                    <CajaHoraria lat={sel_lat} lon={sel_lon} />
                    {/*<Ubicacion onlat={setlat} onlon={setlon} />
                    <CajaHoraria ciudad={ciudadSeleccionada} />*/}

                </div>
                
            </div>
        </div>
    );
}

export default YesPopup;