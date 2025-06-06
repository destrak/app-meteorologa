import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const actividades = [
  { id: 'correr', label: 'Correr' },
  { id: 'leer', label: 'Leer' },
  { id: 'peliculas', label: 'Ver películas' },
  { id: 'jugar', label: 'Jugar videojuegos' },
  { id: 'cocinar', label: 'Cocinar' },
  { id: 'viajar', label: 'Viajar' },
  { id: 'musica', label: 'Escuchar música' },
  { id: 'pintar', label: 'Pintar o dibujar' },
  { id: 'fotografia', label: 'Fotografía' },
  { id: 'jardineria', label: 'Jardinería' }
];

function Quiz() {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const navigate = useNavigate();

  const toggleActividad = (id) => {
    setSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

 const handleFinalizar = () => {
  localStorage.setItem('actividadesPreferidas', JSON.stringify(seleccionadas));
  navigate('/cuentas');
};
  return (
    <main className="quiz-container">
      <h2 className="quiz-title">Actividades preferidas</h2>
      <div className="quiz-options">
       {actividades.map((actividad) => (
  <label key={actividad.id} className="actividad-checkbox">
    <span className="checkbox-label">{actividad.label}</span>
    <input
      type="checkbox"
      checked={seleccionadas.includes(actividad.id)}
      onChange={() => toggleActividad(actividad.id)}
    />
  </label>
))}
      </div>
      <button className="boton-finalizado" onClick={handleFinalizar}>
        Finalizado
      </button>
    </main>
  );
}

export default Quiz;
