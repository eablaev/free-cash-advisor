
import { useState } from "react";


const questions = [
    {
        id: 1,
        text: "How much free cash do you have to invest?",
        type: "number",
        key: "freeCash",
        next: () => 2, // No next question
    },
    {
        id: 0,
        text: "What's your age?",
        type: "number",
        key: "age",
        next: (answer) => (answer >= 18 ? 2 : 3),
    },
    {
        id: 2,
        text: "Are you self-employed?",
        type: "boolean",
        key: "selfEmployed",
        next: () => 4,
    },
    {
        id: 3,
        text: "We recommend waiting until you're 18 to invest. Thanks!",
        type: "end",
        key: null,
        next: null,
    },
   
];




function Form ({userDispatch, userData}) {
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);

    function handleNext() {
        setCurrentQuestionId(currentQuestion.next)
    }

    return (
        <>
        {currentQuestion ? (
            <div>
                <label> {currentQuestion.text}
                    <input type={currentQuestion.type} />
                </label>
            </div>
        ) : (
            <div>
                <h3>You Are Done!</h3>
            </div>
        )}
                  
        <button className='nextBtn' onClick={() => {handleNext(userData)}}>Next</button>
    </>
    )
   
}

export default Form