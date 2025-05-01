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
                </div>
            </nav>
        </>
    );
}

export default UbicationQuery;