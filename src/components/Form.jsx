
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
        id: 2,
        text: "How much of a high-interest debt do you have?",
        type: "number",
        key: "highInterestDebt",
        next: (userData) => (userData.freeCash <= userData.highInterestDebt ? 3 : 4),
        process: (userData, userDispatch) => {
            const availableToDeploy = userData.freeCash - userData.highInterestDebt;
            userDispatch({ type: 'availableToDeploy', payload: availableToDeploy });
        },
    },
    {
        id: 3,
        text: "We recommend covering you debt. Thanks!",
        type: null,
        key: null,
        next: null,
    },
    
    {
        id: 4,
        text: "Whats your monthly expenses?",
        type: "number",
        key: "monthlyExpenses",
        next: (userData) => userData 
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
  
   
];


function Form ({userDispatch, userData}) {
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [inputValue, setInputValue] = useState('')
    
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);


    function handleNext() {
        if(currentQuestion.process) {
            currentQuestion.process(userData, userDispatch)
        }
        
        setCurrentQuestionId(currentQuestion.next(userData))
        setInputValue('')
        
    }

    return (
        <>
        {currentQuestion ? (
            <div>
                <label> {currentQuestion.text}
                    {currentQuestion.type ? <input
                        value={inputValue} 
                        type={currentQuestion.type} 
                        onChange={
                            (e) => {
                                userDispatch({ type: currentQuestion.key, payload: e.target.value}) 
                                setInputValue(e.target.value)
                            }
                            
                    }
                    /> : ''}
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