import { useState } from 'react';
import BarNav from '../components/BarNav';
import UbicationQuery from '../components/UbicationQuery';
import CajaTablas from '../components/CajaTablas';
import YesPopup from '../components/YesPopup';
function Pronostico() {
  const [ciudad, setCiudad] = useState(null);

  return (
    <>
      <BarNav />
      <div className="layout-general">
        <div className="ubicacion-popup-container">
            <div className="ubicacion-query">
              <UbicationQuery onCiudadSeleccionada={setCiudad} />
            </div>
            <div>
              <YesPopup onClose={() => {}} />
            </div>
        </div>
        
      </div>
    </>
  );
}

export default Pronostico;