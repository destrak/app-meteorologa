function CajaDia({ dia }) {
  // Validaciones defensivas
  const fechaFormateada = dia.date || 'Fecha desconocida';
  const iconoUrl = dia.icon ? `https://openweathermap.org/img/wn/${dia.icon}@2x.png` : '';
  const probLluvia = dia.precipitation !== undefined ? `${Math.round(dia.precipitation)}%` : 'N/A';
  const tempMax = dia.maxTemp !== undefined ? Math.round(dia.maxTemp) : '?';
  const tempMin = dia.minTemp !== undefined ? Math.round(dia.minTemp) : '?';

  return (
    <div className="tiempo_dia_mejorado">
      <div className="dia_fecha_seccion">
        <span className="dia_fecha_texto">{fechaFormateada}</span>
      </div>
      
      <div className="dia_clima_seccion">
        <div className="icono_clima_dia">
          {iconoUrl && <img src={iconoUrl} alt="icono del clima" />}
        </div>
        <div className="probabilidad_lluvia">
          <span className="lluvia_icono">💧</span>
          <span className="lluvia_porcentaje">{probLluvia}</span>
        </div>
      </div>
      
      <div className="dia_temperaturas_seccion">
        <div className="temp_maxima">
          <span className="temp_label">Máx</span>
          <span className="temp_valor_max">{tempMax}°</span>
        </div>
        <div className="temp_separador">|</div>
        <div className="temp_minima">
          <span className="temp_label">Mín</span>
          <span className="temp_valor_min">{tempMin}°</span>
        </div>
      </div>
    </div>
  );
}

export default CajaDia;
