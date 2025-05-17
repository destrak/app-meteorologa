import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Preguntas from "./Pages/Preguntas"
function App() {
  const usuario = "Lorem ipsum";


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/preguntas" element={<Preguntas/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App