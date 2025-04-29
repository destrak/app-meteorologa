import { useEffect, useState } from "react";
import CajaDia from "./CajaDia";
import CajaHora from "./CajaHora";
// Asegúrate de importar tu CSS

function CajaHoraria() {
  const [horas, setHoras] = useState([]);
  const [dias, setDias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://mocki.io/v1/64bb75eb-1c5d-46c7-9543-bb8042c7730e");
        const data = await response.json();
        setHoras(data.horas);
        setDias(data.dias);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Cargando datos...</div>;
  }

  return (
    <div className="p-6 bg-blue-100 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold mb-4">Pronóstico</h1>

      {/* Caja de todas las horas horizontal */}
      <div className="tiempo_hora_contenedor">
        {horas.map((item, index) => (
          <CajaHora key={index} {...item} />
        ))}
      </div>

      {/* Caja de los días */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        {dias.map((item, index) => (
          <CajaDia key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CajaHoraria;
