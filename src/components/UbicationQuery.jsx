import homeImage from '../assets/home.svg';
import placeholderImage from '../assets/map.jpg';
import React from 'react';

function UbicationQuery(props) {
    return (
        <>
            <nav className="ubication-query-container">
                    <div className="header-container">
                        <h1 className="header-text">Bienvenido, {props.name}!
                        </h1>
                    </div>
                    <div className="ubicacion-container">
                        <h2>¿Es esta su ubicación?</h2>
                        <div className="ubicacion-image">
                            <img src={placeholderImage} alt="Ubicación" className="ubicacion-actual-image" />
                        </div>
                        <div className="ubicacion-buttons">
                            <button className="ubicacion-button yes">Sí</button>
                            <button className="ubicacion-button no">No</button>
                        </div>
                    </div>
            </nav>
        </>
    );
}


export default UbicationQuery;