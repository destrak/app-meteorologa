function CajaDia({ dia, icono, probabilidad, tempMax, tempMin }) {
    return (
      <div className="tiempo_dia">
        <div className="dia_info">
          <span className="icono">{icono}</span>
          <span className="dia">{dia}</span>
        </div>
        <div className="dia_datos">
          <span className="probabilidad">{probabilidad}% 💧</span>
          <span className="temp_maxmin">{tempMax}° / {tempMin}°</span>
        </div>
      </div>
    );
  }
  
  export default CajaDia;
  