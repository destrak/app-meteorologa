import homeImage from '../assets/home.svg';
import settingImage from '../assets/gear.svg';

function BarNav() {
    return (
        <div className="BarNav-Bar">
            <div className="BarNav-Container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 className="BarNav-Title">
                    App Meteorológica
                </h1>
                <nav className="nav-buttons">
                    <div className="button-group">
                        <a href="index.html" className="nav-button home">
                            <img src={homeImage} alt="Home" className="home-icon" />
                        </a>
                        <a href="index.html" className="nav-button setting">
                            <img src={settingImage} alt="Settings" className="setting-icon" />
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default BarNav;