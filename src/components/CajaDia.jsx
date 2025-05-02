function CajaDia({ dia }) {
    return (
      <div className="tiempo_dia">
        <div className="dia_info">
          <span className="icono">
            <img
            src={`https://openweathermap.org/img/wn/${dia.icon}@2x.png`}
            /> 
          </span>
          <span className="dia">{dia.date}</span>
        </div>
        <div className="dia_datos">
          <span className="probabilidad">{Math.floor(dia.precipitation)}% 💧</span>
          <span className="temp_maxmin">{Math.floor(dia.maxTemp)}° / {Math.floor(dia.minTemp)}°</span>
        </div>
      </div>
    );
  }
  
  export default CajaDia;
  