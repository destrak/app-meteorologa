import React, { useState , useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";

function Ubicacion3({ onlat, onlon, isTemporaryLocation = true }) {
  const [inputCiudad, setInputCiudad] = useState("");
  const [sugerencia, setSugerencia] = useState([]);
  const [CiudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [showSugerencias, setShowSugerencias] = useState(false);
  const { updateUserLocation } = useUser();
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
                nombre: ciudad.nombre,
                country: ciudad.country,
                lat: ciudad.lat,
                lon: ciudad.lon,
                displayName: `${ciudad.nombre}${ciudad.country ? ', ' + ciudad.country : ''}`,
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
    setCiudadSeleccionada({
        name: ciudad.nombre,
        lat: ciudad.lat,
        lon: ciudad.lon,
        country: ciudad.country
    });
    setSugerencia([]);
    setShowSugerencias(false);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (CiudadSeleccionada) {
      onlat(CiudadSeleccionada.lat);
      onlon(CiudadSeleccionada.lon);
      
      // Solo actualizar ubicación temporal si es para cambio temporal
      if (isTemporaryLocation) {
        updateUserLocation({
          lat: CiudadSeleccionada.lat,
          lon: CiudadSeleccionada.lon,
          city: CiudadSeleccionada.name,
          country: CiudadSeleccionada.country
        });
      }
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
        <div style={{ position: 'relative', marginBottom: '15px' }} ref={dropdownRef}>
            <input
                ref={inputRef}
                type="text"
                value={inputCiudad}
                onChange={manejarCambio}
                placeholder="Escribe tu ciudad"
                style={{ 
                    width: '200px', 
                    padding: '8px', 
                    border: '1px solid #ccc',
                    borderRadius: showSugerencias ? '4px 4px 0 0' : '4px',
                    outline: 'none'
                }}
                autoComplete="off"
            />
            
            {showSugerencias && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '200px',
                    backgroundColor: '#1a237e',
                    border: '1px solid #1a237e',
                    borderTop: 'none',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                    maxHeight: '150px',
                    overflowY: 'auto'
                }}>
                    {sugerencia.map((ciudad, index) => (
                        <div
                            key={index}
                            onClick={() => manejarSeleccionCiudad(ciudad)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: index < sugerencia.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                                fontSize: '14px',
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
        
        <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
            }}
        >
            Confirmar ubicación
        </button>
    </form>
  );
}

export default Ubicacion3;
