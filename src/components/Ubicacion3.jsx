import React, { useState , useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";

function Ubicacion3({ onlat, onlon }) {
  const [inputCiudad, setInputCiudad] = useState("");
  const [sugerencia, setSugerencia] = useState([]);
  const [CiudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const { updateUserLocation } = useUser();
  const inputRef = useRef(null);

  const manejarCambio = async (e) => {
    const value = e.target.value;
    setInputCiudad(value);


    if (value.trim() === "") {
        setSugerencia([]);
        setCiudadSeleccionada(null);
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
            // Map backend response to expected format if needed
            setSugerencia(data.map(ciudad => ({
                name: `${ciudad.nombre}${ciudad.country ? ', ' + ciudad.country : ''}`,
                // Optionally add lat/lon if your backend returns them
            })));
        } else {
            setSugerencia([]);
        }
    } catch (error) {
        setSugerencia([]);
    }
    setCiudadSeleccionada(null);
  };

  const manejarSeleccionCiudad = async(e) => {
    const value = e.target.value;
    setInputCiudad(value); 
    const [cityName, countryName] = value.split(',').map(s => s.trim());

    try {
        const response = await fetch(`http://localhost:3000/weather/cords?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryName || '')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                // Use the first result
                setCiudadSeleccionada({
                    name: data[0].nombre,
                    lat: data[0].lat,
                    lon: data[0].lon,
                    country: data[0].country
                });
            } else {
                setCiudadSeleccionada(null);
            }
        } else {
            setCiudadSeleccionada(null);
        }
    } catch (error) {
        setCiudadSeleccionada(null);
    }
    setSugerencia([]); 
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (CiudadSeleccionada) {
      onlat(CiudadSeleccionada.lat);
      onlon(CiudadSeleccionada.lon);
      updateUserLocation({
        lat: CiudadSeleccionada.lat,
        lon: CiudadSeleccionada.lon,
        city: CiudadSeleccionada.name,
        country: CiudadSeleccionada.country
      });
    }
  };
  
  useEffect(() => {
    // Adjust select position if input changes size
    const updateSelectPosition = () => {
        if (inputRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect();
            const top = inputRect.bottom + window.scrollY; // Input bottom + scroll offset
            const left = inputRect.left + window.scrollX;   // Input left + scroll offset
            const width = inputRect.width + 'px';

            selectStyle.position = 'absolute';
            selectStyle.top = top + 'px';
            selectStyle.left = left + 'px';
            selectStyle.width = width;
        }
    };

    updateSelectPosition();
    window.addEventListener('resize', updateSelectPosition);

    return () => {
        window.removeEventListener('resize', updateSelectPosition);
    };
}, [inputCiudad]);

const selectStyle = {
  display: sugerencia.length > 0 ? 'block' : 'none',
  width: '200px',
  padding: '8px',
  border: '1px solid #2563eb', // Tailwind blue-600
  borderRadius: '0.375rem', // Tailwind rounded
  backgroundColor: '#fff',
  color: '#1e293b', // Tailwind slate-800
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)', // subtle blue shadow
  zIndex: 20,
  fontSize: '1rem',
  outline: 'none',
};

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
        <input
            ref={inputRef}
            type="text"
            value={inputCiudad}
            onChange={manejarCambio}
            placeholder="Escribe tu ciudad"
            className="p-2 border rounded mr-2"
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc' }}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Confirmar ubicación
        </button>
        <select
            value={inputCiudad} //  Make sure select value is controlled
            onChange={manejarSeleccionCiudad}
            className="p-2 border rounded mr-2"
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc' , display: sugerencia.length > 0 ? 'block' : 'none' }}
        > <option value="">-- Selecciona --</option>
          {sugerencia.map((ciudad, index) => (
              <option key={index} value={ciudad.name}>
                  {ciudad.name}
              </option>
          ))}
        </select>
    </form>
  );
}

export default Ubicacion3;
