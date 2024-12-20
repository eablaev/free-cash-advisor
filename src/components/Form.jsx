
import { useState } from "react";


function Form ({userDispatch, userData, setMainSection}) {

    const [currentQuestionId, setCurrentQuestionId] = useState(12);
    const [multipleChoiceInputValue, setMultipleChoiceInputValue] = useState([]);
    const [singleAnswerInputValue, setSingleAnswerInputValue] = useState("");
    const [booleanInputValue, setBooleanInputValue] = useState(false);
    
    
    const questions = [
        {
            id: 1,
            text: "How much free cash do you have to invest?",
            type: "number",
            key: "freeCash",
            next: () => 2,
        },
        {
            id: 2,
            text: "How much of a high-interest debt do you have?",
            type: "number",
            key: "highInterestDebt",
            next: () => 3,
        },
        {
            id: 3,
            text: "What are your monthly expenses?",
            type: "number",
            key: "monthlyExpenses",
            next: () => 4,
        },
        {
            id: 4,
            text: `Do you have an emergency fund that covers at least 3 months of expenses? (That's approximately $${userData.monthlyExpenses*3})`,
            type: "boolean",
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            key: "emergencyFund",
            next: () => 5,
        },
        {
            id: 5,
            text: "Do you have a 401k or other retirement accounts?",
            type: "boolean",
            key: "hasRetirementAccount",
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            next: (userData) => userData.hasRetirementAccount ? 6 : 7,  // Proceed to the next question if yes
        },
        {
            id: 6,
            text: "What types of retirement accounts do you have, and are they pre-tax or post-tax? (Select all that apply)",
            type: "multiple-choice",
            options: [
                { label: "Traditional 401k (Pre-tax)", value: "Traditional 401k: Pre-tax" },
                { label: "Roth 401k (Post-tax)", value: "Roth 401k: Post-tax" },
                { label: "Traditional IRA (Pre-tax)", value: "Traditional IRA: Pre-tax" },
                { label: "Roth IRA (Post-tax)", value: "Roth IRA: Post-tax" },
                { label: "Other", value: "Other" },
            ],
            key: "retirementAccountTypes",
            next: () => 7,
        },
        {
            id: 7,
            text: "Do you have a Health Savings Account (HSA)?",
            type: "boolean",
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
            ],
            key: "hasHSA",
            next: () => 8,
        },
        {
            id: 8,
            text: "What are your primary investment goals? (e.g., short-term savings, long-term retirement, etc.)",
            type: "boolean",
            key: "investmentGoals",
            options: [
                { label: "Short-term savings", value: "Short-term savings" },
                { label: "Mid-term savings", value: "Mid-term savings" },
                { label: "Long-term retirement", value: "Long-term retirement" },
            ],
            next: () => 9,
        },
        {
            id: 9,
            text: "How would you describe your risk tolerance? (Low, Medium, High)",
            type: "boolean",
            key: "riskTolerance",
            options: [
                {label: 'Low', value: 'Low'},
                {label: 'Med', value: 'Med'},
                {label: 'High', value: 'High'}
            ],
            next: () => 10,
        },

        {
            id: 10,
            text: "Are you self employed?",
            type: "boolean",
            key: "selfEmployed",
            options: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
            next: () => 11,  
        },

        {
            id: 12,
            text: "Do you have a side-hustle?",
            type: "boolean",
            key: "sideHustle",
            options: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
            process: () => setMainSection('result'),
            next: () => null,  
        }
    ];
    
    
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);

    function handleNext() {
        if(currentQuestion.process) {
            currentQuestion.process(userData, userDispatch)
        }
        
        setCurrentQuestionId(currentQuestion.next(userData))
        setBooleanInputValue(false)
        setMultipleChoiceInputValue([])
        setSingleAnswerInputValue('')
       
        
    }

    return (
        <>
        {currentQuestion ? (
            <div>
                <label> {currentQuestion.text}
                    {currentQuestion.type === 'boolean' ? (
                        <select
                            value={booleanInputValue}
                            onChange={(e) => {
                                userDispatch( {type: currentQuestion.key, payload: e.target.value === 'true'});
                                setBooleanInputValue(e.target.value === "true");
                            }}
                        >
                            {currentQuestion.options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                    
                        </select>
                    ): currentQuestion.type === 'multiple-choice' ? (
                        currentQuestion.options.map((option) => (
                            <div key={option.value}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={option.value}
                                        checked={multipleChoiceInputValue.includes(option.value)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            let updatedValues;
                    
                                            if (e.target.checked) {
                                                // Add the selected option to the array
                                                updatedValues = [...multipleChoiceInputValue, value];
                                            } else {
                                                // Remove the deselected option from the array
                                                updatedValues = multipleChoiceInputValue.filter((v) => v !== value);
                                            }
                    
                                            userDispatch({ type: currentQuestion.key, payload: updatedValues });
                                            setMultipleChoiceInputValue(updatedValues);
                                        }}
                                    />
                                    {option.label}
                                </label>
                        </div>
                        ))
                    ): currentQuestion.type ? <input
                        value={singleAnswerInputValue} 
                        type={currentQuestion.type} 
                        onChange={
                            (e) => {
                                userDispatch({ type: currentQuestion.key, payload: e.target.value}) 
                                setSingleAnswerInputValue(e.target.value)
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