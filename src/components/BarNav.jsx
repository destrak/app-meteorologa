import { useState, useRef, useEffect } from 'react';
import homeImage from '../assets/home.svg';
import settingImage from '../assets/gear.svg';
import { Link } from 'react-router-dom';
function BarNav() {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="BarNav-Bar">
            <div className="BarNav-Container">
                <div className="BarNav-Left">
                    <h1 className="BarNav-Title">App Meteorológica</h1>
                </div>
                <div className="BarNav-Right" ref={menuRef}>
                   <Link to="/home" className="nav-button home">
                    <img src={homeImage} alt="Home" className="home-icon" />
                    </Link>
                    <button onClick={toggleMenu} className="nav-button setting">
                        <img src={settingImage} alt="Settings" className="setting-icon" />
                    </button>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <Link to="/cuenta" className="dropdown-item" onClick={() => setShowMenu(false)}>
                                Cuenta
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BarNav;
