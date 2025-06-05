import { useState } from 'react';
import BarNav from '../components/BarNav';
import UbicationQuery from '../components/UbicationQuery';
import CajaTablas from '../components/CajaTablas';

function Home() {
  const [ciudad, setCiudad] = useState(null);
  const usuario = "Lorem ipsum";

  return (
    <>
      <BarNav />
      <div className="layout-general">
        <div className="ubicacion-query">
          <UbicationQuery name={usuario} onCiudadSeleccionada={setCiudad} />
        </div>

        
          <div className="contenedor-preferencias-y-tabla">
            <CajaTablas />
          </div>
        
      </div>
    </>
  );
}

export default Home;