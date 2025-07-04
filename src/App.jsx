import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BarNav from './components/BarNav';
import Cuenta from './Pages/Cuenta'; 
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Preguntas from "./Pages/Preguntas";
import { UserProvider } from './context/UserContext';
import NotificacionesClima from './components/NotificacionesClima';
import Pronostico from "./Pages/Pronostico";
import MasActividades from './Pages/MasActividades';

function App() {
  return (
    <UserProvider>
      <Router>
        <NotificacionesClima />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preguntas" element={<Preguntas />} />
          <Route path="/mas-actividades" element={<MasActividades />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route
  path="/pronostico"
  element={
    <Pronostico key="pronostico" />
  }
/>

        </Routes>
      </Router>
    </UserProvider>
  );
}
export default App;
