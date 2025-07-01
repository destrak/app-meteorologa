import xImage from '../assets/x.svg';
import Ubicacion3 from './Ubicacion3.jsx';
import React from 'react';

function SeleccionaUbicacion({ onClose }) {
    return (
        <div className="ubicacion3-popup-overlay">
            <div className="ubicacion3-popup">
                <button className="close-btn" onClick={onClose}>
                    <img src={xImage} alt="Cerrar" />
                </button>
                <h2 className="popup-title">Elige tu ciudad</h2>
                <Ubicacion3
                    onlat={() => onClose()}
                    onlon={() => {}}
                    isTemporaryLocation={true}
                />
            </div>
        </div>
    );
}
export default SeleccionaUbicacion;