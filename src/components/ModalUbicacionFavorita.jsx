import React, { useState } from 'react';
import xImage from '../assets/x.svg';
import UbicacionFavorita from './UbicacionFavorita';

function ModalUbicacionFavorita({ onClose }) {
  return (
    <div className="ubicacion3-popup-overlay">
      <div className="ubicacion3-popup">
        <button className="close-btn" onClick={onClose}>
          <img src={xImage} alt="Cerrar" />
        </button>
        <h2 className="popup-title">Establecer ubicación favorita</h2>
        <p style={{ 
          color: '#666', 
          fontSize: '14px', 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          Esta será tu ubicación predeterminada al iniciar sesión
        </p>
        <UbicacionFavorita onClose={onClose} />
      </div>
    </div>
  );
}

export default ModalUbicacionFavorita;