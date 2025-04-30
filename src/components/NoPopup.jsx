import React from 'react';
import xImage from '../assets/x.svg'; 
function NoPopup({ onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-popup-button" onClick={onClose} alt="Cerrar">
                    <img src={xImage} alt="Cerrar" className="close-popup-icon" />
                </button>
                <h1>Seleccione su ubicacion actual</h1>
            </div>
        </div>
    );
}

export default NoPopup;