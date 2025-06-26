import { useNavigate } from 'react-router-dom';
import BarNav from '../components/BarNav';
import CajaTablas from '../components/CajaTablas';
import CajaDiaVertical from '../components/CajadiaVertical';

function MasActividades() {
  const navigate = useNavigate();

  const diaSimulado = {
    icon: '01d',
    date: '26-06-2025',
    precipitation: 10,
    maxTemp: 27,
    minTemp: 16
  };

  return (
    <>
      <BarNav />
      <div className="contenedor-actividades-extra">
        <div className="lado-izquierdo">
          <CajaDiaVertical dia={diaSimulado} />
        </div>

        <div className="lado-derecho">
          <div className="contenedor-actividades-juntas">
            </div>
            <CajaTablas />
        </div>
      </div>
    </>
  );
}

export default MasActividades;
