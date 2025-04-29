import homeImage from '../assets/home.svg';

function BarNav() {
    return (
        <div className="BarNav-Bar">
            <div className="BarNav-Container">
                <h1 className="BarNav-Title">
                    App Meteorológica
                </h1>
                <div className="home-button">
                    <a href="index.html">
                        <img src={homeImage} alt="Home" className="home-icon" />
                    </a>
                </div>
            </div>
        </div>
    );
}
export default BarNav;