import { useEffect, useState } from "react";
import email_icon from '../assets/mail.svg';
import password_icon from '../assets/lock.svg';
import open_eye from '../assets/eye.svg';
import closed_eye from '../assets/eye-closed.svg';
import {useNavigate} from 'react-router-dom';

function LoginSignup() {
    let navigate = useNavigate();

    useEffect(() => {
    document.body.classList.add("login_bg");
    return () => document.body.classList.remove("login_bg");
  }, []);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="login_container">
            <div className="login_header">
                <div className="login_text">Please Log in</div>
            </div>
            <div className="login_inputs">
                <h3 className="login_email_text">Correo</h3>
                <div className="login_input">
                    <img src={email_icon} alt="Email"/>
                    <input type="email"/>
                </div>
                <h3 className="login_pswrd_text">Contraseña</h3>
                <div className="login_input">
                    <img src={password_icon} alt="Contraseña"/>
                    <input type={showPassword ? "text" : "password"} />
                    <button className="login-pswrd-button" onClick={togglePasswordVisibility}>
                         <img src={showPassword ? open_eye : closed_eye} alt="Toggle Password Visibility"/>
                    </button>
                </div>
            </div>
            <div className="submit-container">
                <button className="login_submit_button" onClick={() => {navigate("/preguntas");}}>Login</button>
            </div>
                
            <p className="login-text">
                ¿No tienes una cuenta? <a href="#">Registrate</a>
            </p>
        </div>
        )
}
export default LoginSignup