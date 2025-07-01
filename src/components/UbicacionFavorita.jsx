import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";

function UbicacionFavorita({ onClose }) {
  const [inputCiudad, setInputCiudad] = useState("");
  const [sugerencia, setSugerencia] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { saveFavoriteCity } = useUser();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const manejarCambio = async (e) => {
    const value = e.target.value;
    setInputCiudad(value);
    setCiudadSeleccionada(null);

    if (value.trim() === "") {
      setSugerencia([]);
      setShowSugerencias(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/weather/cities?city=${encodeURIComponent(value)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const ciudades = data.map(ciudad => ({
          displayName: `${ciudad.nombre}${ciudad.country ? ', ' + ciudad.country : ''}`,
          data: ciudad
        }));
        setSugerencia(ciudades);
        setShowSugerencias(ciudades.length > 0);
      } else {
        setSugerencia([]);
        setShowSugerencias(false);
      }
    } catch (error) {
      setSugerencia([]);
      setShowSugerencias(false);
    }
  };

  const manejarSeleccionCiudad = (ciudad) => {
    setInputCiudad(ciudad.displayName);
    setCiudadSeleccionada(ciudad.data); // ciudad.data ya tiene el id de la BD
    setSugerencia([]);
    setShowSugerencias(false);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!ciudadSeleccionada) {
      setError('Por favor selecciona una ciudad de las sugerencias');
      return;
    }

    setLoading(true);
    try {
      // Usar directamente ciudadSeleccionada que ya tiene el id de la BD
      const result = await saveFavoriteCity(ciudadSeleccionada);
      if (result.success) {
        setSuccess('Ciudad favorita guardada exitosamente');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.error || 'Error al guardar ciudad favorita');
      }
    } catch (error) {
      setError(error.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSugerencias(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          color: '#dc2626',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{
          backgroundColor: '#dcfce7',
          border: '1px solid #86efac',
          color: '#166534',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {success}
        </div>
      )}
      
      <div style={{ marginBottom: '15px', position: 'relative' }} ref={dropdownRef}>
        <input
          ref={inputRef}
          type="text"
          value={inputCiudad}
          onChange={manejarCambio}
          placeholder="Escribe tu ciudad favorita"
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #ccc',
            borderRadius: showSugerencias ? '8px 8px 0 0' : '8px',
            fontSize: '16px',
            outline: 'none'
          }}
          disabled={loading}
          autoComplete="off"
        />
        
        {showSugerencias && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#1a237e',
            border: '1px solid #1a237e',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {sugerencia.map((ciudad, index) => (
              <div
                key={index}
                onClick={() => manejarSeleccionCiudad(ciudad)}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderBottom: index < sugerencia.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  transition: 'background-color 0.2s',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1a237e';
                }}
              >
                {ciudad.displayName}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button 
          type="button" 
          onClick={onClose}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          disabled={loading}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          style={{
            backgroundColor: loading ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar ubicación favorita'}
        </button>
      </div>
    </form>
  );
}

export default UbicacionFavorita;