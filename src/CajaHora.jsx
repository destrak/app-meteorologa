function CajaHora({ hora, icono, temp }) {
    return (
      <div className="tiempo_hora">
        <div className="hora">{hora}</div>
        <div className="icono">{icono}</div>
        <div className="temp">{temp}°</div>
      </div>
    );
  }
  
  export default CajaHora;
  