import React, { useState , useRef, useEffect } from "react";

function Ubicacion2({ onlat, onlon }) {
  const [inputCiudad, setInputCiudad] = useState("");
  const [sugerencia, setSugerencia] = useState([]);
  const [CiudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const suggestionsRef = useRef(null);

  const Ciudades_Cords = [
    { name: "Concepción", lat: -36.83, lon: -73.05 },
    { name: "Santiago", lat: -33.45, lon: -70.68 },
    { name: "Concon", lat: -32.93, lon: -71.52 },
    { name: "Valparaíso", lat: -33.04, lon: -71.62 },
    { name: "Rancagua", lat: -34.17, lon: -70.74 },
    { name: "Temuco", lat: -38.73, lon: -72.60 },
    { name: "Chillán", lat: -36.60, lon: -72.10 },
    { name: "Copiapó", lat: -27.37, lon: -70.33 },
    { name: "Coquimbo", lat: -29.95, lon: -71.34 },
    { name: "Coronel", lat: -37.02, lon: -73.15 }
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

  const manejarSugerencia = (ciudad) => {
    setInputCiudad(ciudad.name); 
    setSugerencia([]); 
    setCiudadSeleccionada(ciudad); 
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (CiudadSeleccionada) {
      onlat(CiudadSeleccionada.lat);
      onlon(CiudadSeleccionada.lon);
    }
  };

    useEffect(() => {
        if (sugerencia.length > 5 && suggestionsRef.current) {
            suggestionsRef.current.style.maxHeight = '200px';
            suggestionsRef.current.style.overflowY = 'scroll';
        } else if (suggestionsRef.current) {
            suggestionsRef.current.style.maxHeight = null; 
            suggestionsRef.current.style.overflowY = 'visible';
        }
    }, [sugerencia]);

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
        <input
            type="text"
            value={inputCiudad}
            onChange={manejarCambio}
            placeholder="Escribe tu ciudad"
            className="p-2 border rounded mr-2"
            style={{ width: '300px', padding: '8px', border: '1px solid #ccc' }}
        />
        <ul ref={suggestionsRef} style={{
                    listStyleType: 'none', padding: 0, margin: 0, position: 'absolute', 
                    width: '300px', 
                    border: '1px solid #aaa',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    zIndex: 10, 
                    maxHeight: sugerencia.length > 0 ? '200px' : '0', 
                    overflowY: sugerencia.length > 0 ? 'scroll' : 'hidden', 
                    display: sugerencia.length > 0 ? 'block' : 'none'  
                }}>
            {sugerencia.map((ciudad, index) => (
            <li key={index} onClick={() => manejarSugerencia(ciudad)} style={{ cursor: "pointer", padding: '8px', borderBottom: '1px solid #ccc'  }}>
                {ciudad.name}
            </li>
            ))}
        </ul>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Confirmar ubicación
        </button>
    </form>
  );
}

export default Ubicacion2;
