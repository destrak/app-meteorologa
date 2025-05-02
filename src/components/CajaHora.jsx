function CajaHora({ hora }) {
    const opcionesHora = {
      hour: 'numeric',
      hour12: true,
    };
    const hora_act = new Date(hora.dt*1000).toLocaleTimeString(undefined, opcionesHora)
    return (
      <div className="tiempo_hora">
        <div className="hora">{hora_act}</div>
        <div className="icono">
          <img
          src={`https://openweathermap.org/img/wn/${hora.weather[0].icon}@2x.png`}
          /> 
        </div>
        <div className="temp">{Math.floor(hora.main.temp)}°</div>
      </div>
    );
  }
  
  export default CajaHora;
  