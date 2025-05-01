import React, { useState } from "react";

function Ubicacion({ onSeleccionarCiudad }) {
  const [inputCiudad, setInputCiudad] = useState("");

  const manejarCambio = (e) => {
    setInputCiudad(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (inputCiudad.trim()) {
      onSeleccionarCiudad(inputCiudad.trim());
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
      <input
        type="text"
        value={inputCiudad}
        onChange={manejarCambio}
        placeholder="Escribe tu ciudad"
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Confirmar ubicación
      </button>
    </form>
  );
}

export default Ubicacion;
