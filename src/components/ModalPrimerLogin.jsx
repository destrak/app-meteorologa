import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

function ModalPrimerLogin({ onClose }) {
  const [loading, setLoading] = useState(false);
  const { requestUserLocation } = useUser();

  const handleUsarUbicacion = async () => {
    setLoading(true);
    try {
      await requestUserLocation();
      onClose();
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsarSantiago = () => {
    // Ya está configurado Santiago por defecto en el contexto
    onClose();
  };

  return (
    <div className="ubicacion3-popup-overlay">
      <div className="ubicacion3-popup">
        <h2 className="popup-title">¡Bienvenido!</h2>
        <p style={{ 
          color: '#666', 
          fontSize: '16px', 
          textAlign: 'center', 
          marginBottom: '20px',
          lineHeight: '1.5'
        }}>
          Para ofrecerte el mejor pronóstico del tiempo, ¿nos permites acceder a tu ubicación?
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
          <button 
            onClick={handleUsarUbicacion}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? 'Obteniendo ubicación...' : '📍 Usar mi ubicación'}
          </button>
          
          <button 
            onClick={handleUsarSantiago}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Usar Santiago por defecto
          </button>
        </div>
        
        <p style={{ 
          color: '#888', 
          fontSize: '12px', 
          textAlign: 'center', 
          marginTop: '20px' 
        }}>
          Podrás cambiar tu ubicación favorita más tarde en tu perfil
        </p>
      </div>
    </div>
  );
}

export default ModalPrimerLogin;