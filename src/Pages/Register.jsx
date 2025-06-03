import LoginSignup from '../components/LoginSignup';

function Register() {
    return(
        <>
        <div className="login_bg">
            <LoginSignup isRegister={true}/>
        </div>
        </>
    )
}
export default Register;
