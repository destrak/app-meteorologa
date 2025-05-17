import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    return(
        <>
            <div className="quiz_container">
                <h1 className="quiz_title">Quiz</h1>
                <div className="quiz_question">
                    <p>Cuanto es 2+2?</p>
                    <button className="quiz_option_button A" onClick={() => setUserAnswers([...userAnswers, '1'])}>1 y alargo el boton</button>
                    <button className="quiz_option_button B" onClick={() => setUserAnswers([...userAnswers, '2'])}>2 y alargo el boton</button>
                    <button className="quiz_option_button C" onClick={() => setUserAnswers([...userAnswers, '3'])}>3 y alargo el boton</button>
                </div>
                <div className="quiz-finish">
                    <button className="quiz_finish_button" onClick={() => navigate("/")}>Finalizar</button>
                </div>
            </div>
        </>
    );
}
export default Quiz;