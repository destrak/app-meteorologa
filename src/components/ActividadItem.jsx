function ActividadItem({ nombre, duracion, tipo, descripcion, onEditar }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="actividad-item" onClick={() => setExpandido(!expandido)}>
      <div className="actividad-header">
        {nombre}
      </div>
      <div className="actividad-meta">
        {duracion} — Tipo: {tipo}
      </div>
      {expandido && (
        <div className="actividad-descripcion">
          {descripcion}
          <br />
          <button
            className="editar-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEditar();
            }}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}
