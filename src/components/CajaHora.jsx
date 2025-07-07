function CajaHora({ hora }) {
    const opcionesHora = {
      hour: 'numeric',
      hour12: true,
    };
    const hora_act = new Date(hora.dt*1000).toLocaleTimeString(undefined, opcionesHora)
    const temperatura = Math.round(hora.main.temp);
    
    return (
      <div className="tiempo_hora_mejorado">
        <div className="hora_texto">{hora_act}</div>
        <div className="icono_hora">
          <img
            src={`https://openweathermap.org/img/wn/${hora.weather[0].icon}@2x.png`}
            alt="Clima"
          /> 
        </div>
        <div className="temp_hora">{temperatura}°</div>
      </div>
    );
  }
  
  export default CajaHora;
  