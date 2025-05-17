import React from 'react' 
import user_icon from '../assets/user.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import {useNavigate} from 'react-router-dom';

function LoginSignup() {
    let navigate = useNavigate();

    return(
        <div className="login_container">
            <div className="login_header">
                <div className="login_text">El login (no funciona)</div>
            </div>
            <div className="login_inputs">
                <div className="login_input">
                    <img src={user_icon} alt="Usuario"/>
                    <input type="user" placehoder="Usuario"/>
                </div>
                <div className="login_input">
                    <img src={email_icon} alt="Email"/>
                    <input type="email" placeholder="Correo Electrónico"/>
                </div>
                <div className="login_input">
                    <img src={password_icon} alt="Contraseña"/>
                    <input type="password" placeholder="Contraseña"/>
                </div>
            </div>
            <div className="submit-container">
                <button className="login_submit_button" onClick={() => {navigate("/preguntas");}}>Login</button>
            </div>
        </div>
        )
}
export default LoginSignup