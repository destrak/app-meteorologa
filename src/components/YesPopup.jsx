import CajaHoraria from './CajaHoraria.jsx';
import React from 'react';
import { useUser } from '../context/UserContext';

function YesPopup(props) {
    const { user, userLocation } = useUser();

    // Usar el nombre del usuario del contexto si está disponible
    const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || props.name;

    return (
        <div className="yespopup-card">
            <div className="yespopup-main-row">
                <div className="yespopup-weather-row">
                    <CajaHoraria lat={userLocation.lat} lon={userLocation.lon} />
                </div>
            </div>
        </div>
    );
}
export default YesPopup;