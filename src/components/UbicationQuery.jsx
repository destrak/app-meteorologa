import React, { useState } from 'react';
import YesPopup from './YesPopup.jsx';

function UbicationQuery(props) {
    const [showYesPopup, setShowYesPopup] = useState(false);

    const handleYesClick = () => {
        setShowYesPopup(true); // Para la opción de "yes", muestra el clima
    };

    const handleClosePopup = () => {
        setShowYesPopup(false); // Cerrar Yespopup
    };

    const locations = [
        { lat: -36.82, lon:  -73.04 }, //Conce
    ];

    const index = 0;

    return (
        <>
            <nav className="ubication-query-container">
                <div className="ubicacion-content-wrapper">
                    <div className="header-container">
                        <h1 className="header-text">Bienvenido, {props.name}!</h1>
                        <div className="ubicacion-buttons">
                            <button className="ubicacion-button" onClick={handleYesClick}>Insertar Ubicación</button>
                            {showYesPopup && <YesPopup onClose={handleClosePopup} />}
                        </div>
                    </div>
                    <h2>Clima en distintas ciudades</h2>
                    <div className='weather-grid'>
                    {locations.map((loc) => (
                        <WeatherCard lat={loc.lat} lon={loc.lon} />
                    ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default UbicationQuery;