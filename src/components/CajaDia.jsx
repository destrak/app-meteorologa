function CajaDia({ dia }) {
  // Validaciones defensivas
  const fechaFormateada = dia.date || 'Fecha desconocida';
  const iconoUrl = dia.icon ? `https://openweathermap.org/img/wn/${dia.icon}@2x.png` : '';
  const probLluvia = dia.precipitation !== undefined ? `${Math.floor(dia.precipitation)}% 💧` : 'N/A';
  const tempMax = dia.maxTemp !== undefined ? Math.floor(dia.maxTemp) : '?';
  const tempMin = dia.minTemp !== undefined ? Math.floor(dia.minTemp) : '?';

  return (
    <div className="tiempo_dia">
      <div className="dia_info">
        <span className="icono">
          {iconoUrl && <img src={iconoUrl} alt="icono del clima" />}
        </span>
        <span className="dia">{fechaFormateada}</span>
      </div>
      <div className="dia_datos">
        <span className="probabilidad">{probLluvia}</span>
        <span className="temp_maxmin">{tempMax}° / {tempMin}°</span>
      </div>
    </div>
  );
}

export default CajaDia;
