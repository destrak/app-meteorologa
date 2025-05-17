import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BarNav from './components/BarNav';
import UbicationQuery from './components/UbicationQuery';
import Cuentas from './components/Cuenta'; 
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Preguntas from "./Pages/Preguntas"
function App() {
  const usuario = "Lorem ipsum";
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Santiago");

  const manejarSeleccionCiudad = (ciudad) => {
    setCiudadSeleccionada(ciudad);
  };

  return (
    <Router>
      <BarNav />
      <Routes>
                <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/preguntas" element={<Preguntas/>}/>
        <Route path="/" element={<UbicationQuery name={usuario} />} />
        <Route path="/cuentas" element={<Cuentas usuario={usuario} />} />
      </Routes>
    </Router>
  );
}

export default App;
