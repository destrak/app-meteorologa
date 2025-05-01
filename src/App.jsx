import { useState } from 'react'  
import './App.css'
import BarNav from './components/BarNav';
import UbicationQuery from './components/UbicationQuery';

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
    </>
  );
}

export default App