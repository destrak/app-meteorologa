import placeholderImage from '../assets/map.jpg';
import React, { useState } from 'react';
import YesPopup from './YesPopup.jsx';
import NoPopup from './NoPopup.jsx';

function UbicationQuery(props) {
    const [showYesPopup, setShowYesPopup] = useState(false);

    const handleYesClick = () => {
        setShowYesPopup(true); // Para la opción de "yes", muestra el clima
    };

    const handleClosePopup = () => {
        setShowYesPopup(false); // Cerrar Yespopup
    };
    
    const [showNoPopup, setShowNoPopup] = useState(false);

    const handleNoClick = () => {
        setShowNoPopup(true); // Para la opción de "no", muestra el popup correspondiente
    };

    const handleCloseNoPopup = () => {
        setShowNoPopup(false); // Cerrar NoPopup
    };
    return (
        <>
            <nav className="ubication-query-container">
                <div className="header-container">
                    <h1 className="header-text">Bienvenido, {props.name}!</h1>
                </div>
                <div className="ubicacion-container">
                    <h2>¿Es esta su ubicación?</h2>
                    <div className="ubicacion-image">
                        <img src={placeholderImage} alt="Ubicación" className="ubicacion-actual-image" />
                    </div>
                    <div className="ubicacion-buttons">
                        <button className="ubicacion-button yes" onClick={handleYesClick}>Sí</button>
                        <button className="ubicacion-button no" onClick={handleNoClick}>No</button>
                        {showYesPopup && <YesPopup onClose={handleClosePopup} />}
                        {showNoPopup && <NoPopup onClose={handleCloseNoPopup} />}
                        
                    </div>
                </div>
            </nav>
        </>
    );
}

export default UbicationQuery;