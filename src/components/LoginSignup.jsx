import { useEffect, useState } from "react";
import email_icon from '../assets/mail.svg';
import password_icon from '../assets/lock.svg';
import open_eye from '../assets/eye.svg';
import closed_eye from '../assets/eye-closed.svg';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function LoginSignup({ isRegister = false }) {
    let navigate = useNavigate();
    const { login, register, loading } = useUser();

    useEffect(() => {
        document.body.classList.add("login_bg");
        return () => document.body.classList.remove("login_bg");
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nombre: ''
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (isRegister) {
            // Validación básica para registro
            if (!formData.email || !formData.password || !formData.confirmPassword || !formData.nombre) {
                alert('Por favor, complete todos los campos');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            const result = await register(formData.email, formData.password, formData.nombre);
            
            if (result.success) {
                // El registro hace auto-login, navegamos a la página principal
                navigate("/");
            } else {
                alert(result.error);
            }
        } else {
            // Lógica de login
            if (!formData.email || !formData.password) {
                alert('Por favor, ingrese email y contraseña');
                return;
            }
            
            const result = await login(formData.email, formData.password);
            
            if (result.success) {
                navigate("/");
            } else {
                alert(result.error);
            }
        }
    };

    const handleGoogleAuth = () => {
        alert('La autenticación con Google estará disponible próximamente');
    };

    return (
        <div className="login_container">
            <div className="login_header">
                <div className="login_text">
                    {isRegister ? 'Create an account' : 'Inicie Sesión'}
                </div>
            </div>
            <div className="login_inputs">
                {isRegister && (
                    <>
                        <h3 className="login_email_text">Nombre</h3>
                        <div className="login_input">
                            <img src={email_icon} alt="Nombre" />
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                placeholder="Tu nombre"
                            />
                        </div>
                    </>
                )}
                
                <h3 className="login_email_text">Correo</h3>
                <div className="login_input">
                    <img src={email_icon} alt="Email" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={isRegister ? "tu@email.com" : ""}
                    />
                </div>
                <h3 className="login_pswrd_text">Contraseña</h3>
                <div className="login_input">
                    <img src={password_icon} alt="Contraseña" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={isRegister ? "Enter your password" : ""}
                    />
                    <button className="login-pswrd-button" onClick={togglePasswordVisibility}>
                        <img src={showPassword ? open_eye : closed_eye} alt="Toggle Password Visibility" />
                    </button>
                </div>
                {isRegister && (
                    <>
                        <h3 className="login_pswrd_text">Confirmar Contraseña</h3>
                        <div className="login_input">
                            <img src={password_icon} alt="Confirmar Contraseña" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                            />
                            <button className="login-pswrd-button" onClick={toggleConfirmPasswordVisibility}>
                                <img src={showConfirmPassword ? open_eye : closed_eye} alt="Toggle Password Visibility" />
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="submit-container">
                <button 
                    className="login_submit_button" 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : (isRegister ? 'Create account' : 'Login')}
                </button>
            </div>

            {/* Botón de Google */}
            <button className="google_auth_button" onClick={handleGoogleAuth}>
                <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginRight: '8px' }}>
                    <path d="M19.6 10.23c0-.82-.08-1.42-.16-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22l-.02.1 2.94 2.26.2.02c1.88-1.74 2.02-4.3 2.02-5.27z" fill="#4285F4" />
                    <path d="M10 20c2.7 0 4.97-.89 6.62-2.42l-3.12-2.44c-.83.56-1.95 1-3.5 1-2.65 0-4.89-1.73-5.69-4.14l-.12.01L1.07 14.3l-.05.13C2.74 17.82 6.13 20 10 20z" fill="#34A853" />
                    <path d="M4.31 11.86c-.21-.63-.33-1.3-.33-2.02s.11-1.38.33-2.02V7.7L1.17 5.38l-.1.05A9.97 9.97 0 000 9.84c0 1.61.39 3.13 1.07 4.49l3.24-2.47z" fill="#FBBC04" />
                    <path d="M10 3.88c1.88 0 3.13.8 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.13 0 2.74 2.18 1.07 5.57l3.24 2.47C5.1 5.61 7.35 3.88 10 3.88z" fill="#EA4335" />
                </svg>
                Continue with Google
            </button>

            <p className="login-text">
                {isRegister ? (
                    <>Already Have An Account? <a href="/login">Log In</a></>
                ) : (
                    <>¿No tienes una cuenta? <a href="/register">Registrate</a></>
                )}
            </p>
        </div>
    )
}
export default LoginSignup;