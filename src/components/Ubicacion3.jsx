import React, { useState , useRef, useEffect } from "react";

function Ubicacion3({ onlat, onlon }) {
  const [inputCiudad, setInputCiudad] = useState("");
  const [sugerencia, setSugerencia] = useState([]);
  const [CiudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const inputRef = useRef(null);

  const Ciudades_Cords = [
    { name: "Concepción", lat: -36.82, lon: -73.04 },
    { name: "Santiago", lat: -33.45, lon: -70.64 },
    { name: "Concon", lat: -32.93, lon: -71.52 },
    { name: "Valparaíso", lat: -33.04, lon: -71.61 },
    { name: "Rancagua", lat: -34.17, lon: -70.74 },
    { name: "Chillán", lat: -36.60, lon: -72.10 },
    { name: "Copiapó", lat: -27.37, lon: -70.33 },
    { name: "Coquimbo", lat: -29.95, lon: -71.34 },
    { name: "Coronel", lat: -37.02, lon: -73.15 },
    { name: "La Serena", lat: -29.90, lon: -71.25 },
    { name: "Antofagasta", lat: -23.65, lon: -70.39 },
    { name: "Puerto Montt", lat: -41.47, lon: -72.93 },
    { name: "Temuco", lat: -38.73, lon: -72.59 },
    { name: "Iquique", lat: -20.21, lon: -70.15 },
  ];

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
            console.log("Fetched cities:", data);
            setSugerencia(data.map(ciudad => ({
                name: `${ciudad.nombre}${ciudad.country ? ', ' + ciudad.country : ''}`,
                // Optionally add lat/lon if your backend returns them
            })));
        } else {
            console.log("Fetch failed with status:", response.status);
            setSugerencia([]);
        }
    } catch (error) {
        console.log("Fetch error:", error);
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
            console.log("Coordinates:", data);
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
            console.log("Failed to fetch coordinates:", response.status);
            setCiudadSeleccionada(null);
        }
    } catch (error) {
        console.log("Error fetching coordinates:", error);
        setCiudadSeleccionada(null);
    }
    setSugerencia([]); 
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (CiudadSeleccionada) {
      onlat(CiudadSeleccionada.lat);
      onlon(CiudadSeleccionada.lon);
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
