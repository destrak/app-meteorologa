import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <nav>
        <div className="home-button">
            <a href="index.html">
                    <img src="images/home.svg" alt="Home" className="home-icon"></img>
                </a>
            </div>
        </nav>
        <h1>Bienvenido a [Nombre]!</h1>
    <main>

    </main>
    <div className="ubicacion-container">
        <h2>¿Es esta su ubicación?</h2>
        <div className="ubicacion-buttons">
            <a href="page2.html" className="ubicacion-button yes">Sí</a>
            <a href="page3.html" className="ubicacion-button no">No</a>
        </div>
    </div>
    <script src="js/script.js"></script>

    </>
  )
}

export default App
