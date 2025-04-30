import { useEffect, useState } from "react";
import CajaDia from "./CajaDia";
import CajaHora from "./CajaHora";

function CajaHoraria({ ciudad }) {
  const [horas, setHoras] = useState([]);
  const [dias, setDias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    // Simulación de datos para Santiago
    let data;

    if (ciudad.toLowerCase() === "concepción" || ciudad.toLowerCase() === "concepcion") {
      data = {
        ciudad: "Concepción",
       "horas": [
    { "hora": "6 PM", "icono": "☁️", "temp": 13 },
    { "hora": "7 PM", "icono": "🌧️", "temp": 12 },
    { "hora": "8 PM", "icono": "🌧️", "temp": 11 },
    { "hora": "9 PM", "icono": "🌧️", "temp": 11 },
    { "hora": "10 PM", "icono": "🌧️", "temp": 10 },
    { "hora": "11 PM", "icono": "🌧️", "temp": 9 },
    { "hora": "12 AM", "icono": "☁️", "temp": 9 }
  ],
  "dias": [
    { "dia": "Lunes", "icono": "🌧️", "probabilidad": 70, "tempMax": 14, "tempMin": 9 },
    { "dia": "Martes", "icono": "🌧️", "probabilidad": 80, "tempMax": 13, "tempMin": 8 },
    { "dia": "Miércoles", "icono": "☁️", "probabilidad": 40, "tempMax": 15, "tempMin": 9 },
    { "dia": "Jueves", "icono": "🌦️", "probabilidad": 50, "tempMax": 16, "tempMin": 10 },
    { "dia": "Viernes", "icono": "☁️", "probabilidad": 30, "tempMax": 15, "tempMin": 10 },
    { "dia": "Sábado", "icono": "☀️", "probabilidad": 10, "tempMax": 17, "tempMin": 11 },
    { "dia": "Domingo", "icono": "☁️", "probabilidad": 20, "tempMax": 16, "tempMin": 10 }
  ],

      };
    } else {
      data = {
        ciudad: "Santiago",
        horas: [
          { hora: "6 PM", icono: "☀️", temp: 15 },
          { hora: "7 PM", icono: "☀️", temp: 14 },
          { hora: "8 PM", icono: "🌙", temp: 13 },
          { hora: "9 PM", icono: "🌙", temp: 12 },
          { hora: "10 PM", icono: "🌙", temp: 12 },
          { hora: "11 PM", icono: "🌙", temp: 11 },
          { hora: "12 AM", icono: "☁️", temp: 10 }
        ],
        dias: [
          { dia: "Lunes", icono: "☀️", probabilidad: 0, tempMax: 18, tempMin: 8 },
          { dia: "Martes", icono: "☁️", probabilidad: 10, tempMax: 17, tempMin: 7 },
          { dia: "Miércoles", icono: "🌧️", probabilidad: 80, tempMax: 16, tempMin: 11 },
          { dia: "Jueves", icono: "🌧️", probabilidad: 60, tempMax: 17, tempMin: 7 },
          { dia: "Viernes", icono: "☁️", probabilidad: 20, tempMax: 17, tempMin: 8 },
          { dia: "Sábado", icono: "☀️", probabilidad: 0, tempMax: 19, tempMin: 10 },
          { dia: "Domingo", icono: "☁️", probabilidad: 30, tempMax: 18, tempMin: 9 }
        ]
      };
    }
  
    setHoras(data.horas.slice (0, 24));
    setDias(data.dias.slice(0, 7));
    setLoading(false);
  }, [ciudad]);

  return (
    <div className="p-6 bg-blue-100 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold mb-4">Pronóstico</h1>
      <p className="text-lg">Mostrando resultados para: <strong>{ciudad}</strong></p>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          <div className="tiempo_hora_contenedor">
            {horas.map((item, index) => (
              <CajaHora key={index} {...item} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
            {dias.map((item, index) => (
              <CajaDia key={index} {...item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CajaHoraria;
