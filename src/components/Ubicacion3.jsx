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

  const manejarCambio = (e) => {
    const value = e.target.value;
    setInputCiudad(value);

    const filtro = Ciudades_Cords.filter(ciudad =>
        ciudad.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSugerencia(filtro);
    setCiudadSeleccionada(null);
  };

  const manejarSeleccionCiudad = (e) => {
    const cityName = e.target.value;
    setInputCiudad(cityName); 

    const ciudad = Ciudades_Cords.find(c => c.name === cityName);
    if (ciudad) {
        setCiudadSeleccionada(ciudad);
        setSugerencia([]); 
    }
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
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  zIndex: 10,
  // Position will be set dynamically in useEffect
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
