import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Quiz() {
  const [actividades, setActividades] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [unseleccionadas, setUnseleccionadas] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();
  
  useEffect(() => {
    fetch('http://localhost:3000/activities')
      .then(res => res.json())
      .then(data => {
        if (data.activities) {
          setActividades(data.activities.map(a => ({
            id: a.id,
            label: a.nombre, // or a.label if your DB uses that
            min_temp: a.min_temp,
            max_temp: a.max_temp,
            prefiere_soleado: a.prefiere_soleado,
            prefiere_nublado: a.prefiere_nublado,
            prefiere_lluvia: a.prefiere_lluvia,
          })));
        }
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
      });
      if (user && user.id) {
        fetch(`http://localhost:3000/user-preferences/${user.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.preferences) {
              // Extract actividad_id from each preference
              const seleccionadasIds = data.preferences.map(pref => ({
                id: pref.id,
                actividad_id: pref.actividad_id
              }));
              console.log(seleccionadasIds)
              setSeleccionadas(seleccionadasIds);
            }
          })
          .catch(err => {
            console.error('Error fetching user preferences:', err);
          });
      }
  }, [user]);

const toggleActividad = (actividad_id) => {
  setSeleccionadas(prevSeleccionadas => {
    const found = prevSeleccionadas.find(sel => sel.actividad_id === actividad_id);

    if (found) {
      // Remove from seleccionadas
      const newSeleccionadas = prevSeleccionadas.filter(sel => sel.actividad_id !== actividad_id);

      setUnseleccionadas(prevUnsel => {
        if (found.id !== undefined && !prevUnsel.some(u => u.id === found.id)) {
          return [...prevUnsel, found];
        }
        return prevUnsel;
      });

      return newSeleccionadas;
    } else {
      // --- FIX: Get id from unseleccionadas synchronously ---
      let idToUse = undefined;
      const wasUnselected = unseleccionadas.find(u => u.actividad_id === actividad_id);
      if (wasUnselected) {
        idToUse = wasUnselected.id;
        setUnseleccionadas(prevUnsel =>
          prevUnsel.filter(u => u.actividad_id !== actividad_id)
        );
      }
      // Use the id from unseleccionadas if it existed, otherwise undefined
      return [...prevSeleccionadas, { id: idToUse, actividad_id }];
    }
  });
};

  useEffect(() => {
    console.log('Seleccionadas updated:', seleccionadas);
    console.log('unSeleccionadas updated:', unseleccionadas);
  }, [seleccionadas, unseleccionadas]);


 const handleFinalizar = async () => {
    for (const pref of unseleccionadas) {
      if (pref.id !== undefined) {
        try {
          await fetch(`http://localhost:3000/user-preferences/${pref.id}`, {
            method: 'DELETE'
          });
        } catch (err) {
          console.error(`Error deleting preference with id ${pref.id}:`, err);
        }
      }
    }
    for (const sel of seleccionadas) {
      if (sel.id === undefined && user && user.id) {
        const actividad = actividades.find(a => a.id === sel.actividad_id);
        if (!actividad) continue; // parche mientras busco una manera mas efeciente temporalmente, se nota que demora el agregar
        try {
          await fetch('http://localhost:3000/user-preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario_id: user.id,
              actividad_id: sel.actividad_id,
              min_temp: actividad.min_temp,
              max_temp: actividad.max_temp,
              prefiere_soleado: actividad.prefiere_soleado,
              prefiere_nublado: actividad.prefiere_nublado,
              prefiere_lluvia: actividad.prefiere_lluvia,
            })
          });
        } catch (err) {
          console.error(`Error adding preference for actividad_id ${sel.actividad_id}:`, err);
        }
      }
    }
    localStorage.setItem('actividadesPreferidas', JSON.stringify(seleccionadas));
    navigate('/cuenta');
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
      checked={seleccionadas.some(sel => sel.actividad_id === actividad.id)}
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
