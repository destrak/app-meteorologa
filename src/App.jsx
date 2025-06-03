import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BarNav from './components/BarNav';
import Cuentas from './Pages/Cuenta'; 
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Preguntas from "./Pages/Preguntas";

function App() {
  const usuario = "Lorem ipsum";

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/cuentas" element={<Cuentas usuario={usuario} />} />
      </Routes>
    </Router>
  );
}
export default App;
