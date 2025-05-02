import React, { useState } from "react";

const ciudadesDisponibles = [
  { nombre: "Santiago", lat: -33.4489, lon: -70.6693 },
  { nombre: "Valparaíso", lat: -33.0472, lon: -71.6127 },
  { nombre: "Concepción", lat: -36.8201, lon: -73.0444 },
  { nombre: "La Serena", lat: -29.9027, lon: -71.2519 },
  { nombre: "Antofagasta", lat: -23.6509, lon: -70.3975 },
  { nombre: "Puerto Montt", lat: -41.4717, lon: -72.9394 },
  { nombre: "Temuco", lat: -38.7359, lon: -72.5904 },
  { nombre: "Iquique", lat: -20.2133, lon: -70.1521 },
];

const API_KEY = "API_KEY"; // Reemplazar API Key

function Ubicacion2({ onSeleccionarCiudad }) {
  const [inputCiudad, setInputCiudad] = useState("");

  const manejarCambio = (e) => {
    setInputCiudad(e.target.value);
  };

  const obtenerClimaPorCoordenadas = async ({ nombre, lat, lon }) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
      const res = await fetch(url);
      const datos = await res.json();
      onSeleccionarCiudad({ ciudad: nombre, datos });
    } catch (error) {
      console.error("Error al obtener clima:", error);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const ciudadIngresada = inputCiudad.trim();
    if (!ciudadIngresada) return;

    const ciudad = ciudadesDisponibles.find(c => c.nombre.toLowerCase() === ciudadIngresada.toLowerCase());

    if (ciudad) {
      obtenerClimaPorCoordenadas(ciudad);
    } else {
      alert("Ciudad no encontrada. Selecciona una desde la lista.");
    }
  };

  const manejarSeleccion = (e) => {
    const index = e.target.value;
    if (index !== "") {
      const ciudad = ciudadesDisponibles[index];
      setInputCiudad(ciudad.nombre);
      obtenerClimaPorCoordenadas(ciudad);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={manejarEnvio} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={inputCiudad}
          onChange={manejarCambio}
          placeholder="Escribe tu ciudad"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Confirmar ubicación
        </button>
      </form>

      <div className="mt-2">
        <label className="block mb-1">O selecciona una ciudad:</label>
        <select
          onChange={manejarSeleccion}
          className="w-full p-2 border rounded overflow-y-scroll"
          size="5"
        >
          <option value="">-- Selecciona --</option>
          {ciudadesDisponibles.map((ciudad, index) => (
            <option key={index} value={index}>
              {ciudad.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Ubicacion2;
