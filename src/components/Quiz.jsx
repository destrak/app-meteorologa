import preguntas from './preguntas.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]); // Guarda los tipos seleccionados
  const [finalizado, setFinalizado] = useState(false);
  const navigate = useNavigate();

  function handleAnswer(tipoSeleccionado) {
    const nuevasRespuestas = [...respuestas, tipoSeleccionado];
    setRespuestas(nuevasRespuestas);

    if (preguntaActual + 1 < preguntas.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setFinalizado(true);
    }
  }

  // Calcula el tipo más seleccionado
  function obtenerTipoMasSeleccionado() {
    const conteo = {};
    respuestas.forEach(tipo => {
      conteo[tipo] = (conteo[tipo] || 0) + 1;
    });
    // Busca el tipo con mayor cantidad
    let maxTipo = null;
    let maxCantidad = 0;
    for (const tipo in conteo) {
      if (conteo[tipo] > maxCantidad) {
        maxCantidad = conteo[tipo];
        maxTipo = tipo;
      }
    }
    return maxTipo;
  }

  return (
    <main className="quiz app-vertical">
      {!finalizado ? ( /* Loop principal*/
        <>
          <h1>Pregunta {preguntaActual + 1} de {preguntas.length}</h1>
          <div className="titulo-pregunta">
            <div className="pregunta-titulo">{preguntas[preguntaActual].titulo}</div>
            <div className="titulo-pregunta-texto">
              {preguntas[preguntaActual].opciones.map((respuesta, idx) => (
                <button
                  key={idx}
                  className="boton-respuesta"
                  onClick={() => handleAnswer(respuesta.isSelected)}
                >
                  {respuesta.textoRespuesta}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h2>¡Cuestionario finalizado!</h2>
          <p>
            El tipo de respuesta más seleccionado fue:{" "}
            <strong>{obtenerTipoMasSeleccionado()}</strong>
          </p>
          <button className="quiz-home-button" onClick={() => navigate('/')}>
            Finalizar
          </button>
        </div>
      )}
    </main>
  );
}

export default Quiz;