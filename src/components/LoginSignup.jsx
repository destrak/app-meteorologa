import { useEffect, useState } from "react";
import email_icon from '../assets/mail.svg';
import password_icon from '../assets/lock.svg';
import open_eye from '../assets/eye.svg';
import closed_eye from '../assets/eye-closed.svg';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ModalPrimerLogin from './ModalPrimerLogin';

function LoginSignup({ isRegister = false }) {
    let navigate = useNavigate();
    const { login, register, loading } = useUser();
    const [showModalPrimerLogin, setShowModalPrimerLogin] = useState(false);

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
                navigate("/home");
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
                if (!result.hasFavoriteCity) {
                    // Mostrar modal para primer login
                    setShowModalPrimerLogin(true);
                } else {
                    navigate("/home");
                }
            } else {
                alert(result.error);
            }
        }
    };


    const handleCloseModalPrimerLogin = () => {
        setShowModalPrimerLogin(false);
        navigate("/home");
    };

    return (
        <div className="login_container">
            <div className="login_header">
                <div className="login_text">
                    {isRegister ? 'Registrarse' : 'Inicie Sesión'}
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
                        placeholder={isRegister ? "Ingrese su contraseña" : ""}
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
                                placeholder="Confirmar contraseña"
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
                    {loading ? 'Cargando...' : (isRegister ? 'Registrarse' : 'Iniciar Sesión')}
                </button>
            </div>


            <p className="login-text">
                {isRegister ? (
                    <>Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></>
                ) : (
                    <>¿No tienes una cuenta? <a href="/register">Registrate</a></>
                )}
            </p>
            
            {/* Modal para primer login */}
            {showModalPrimerLogin && (
                <ModalPrimerLogin onClose={handleCloseModalPrimerLogin} />
            )}
        </div>
    )
}
export default LoginSignup;