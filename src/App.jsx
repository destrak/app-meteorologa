import { useState } from 'react'  
import './App.css'
import BarNav from './components/BarNav';
import UbicationQuery from './components/UbicationQuery';

import ZonaHoraria from './zonahoraria.jsx'
import CajaDia from './CajaDia.jsx'
import CajaHora from './CajaHora.jsx'
import CajaHoraria from './CajaHoraria.jsx'
import Ubicacion from './ubicacion.jsx'
function App() {
  const usuario = "Lorem ipsum";
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Santiago");
  
    const manejarSeleccionCiudad = (ciudad) => {
      setCiudadSeleccionada(ciudad);
    };

  return (
    <>
      <BarNav />
      <UbicationQuery name={usuario} />
      <nav>
        <div className="home-button">
            <a href="index.html">
                <img src="images/home.svg" alt="Home" className="home-icon" />
            </a>
        </div>
      </nav>
      <h1>Bienvenido a [Nombre]!</h1>
      <main>
        <ZonaHoraria />
        <Ubicacion onSeleccionarCiudad={manejarSeleccionCiudad} />
        <CajaHoraria ciudad={ciudadSeleccionada} />
      </main>
      <div className="ubicacion-container">
          <h2>¿Es esta su ubicación?</h2>
          <div className="ubicacion-buttons">
              <a href="page2.html" className="ubicacion-button yes">Sí</a>
              <a href="page3.html" className="ubicacion-button no">No</a>
          </div>
      </div>
    </>
  );
}

export default App