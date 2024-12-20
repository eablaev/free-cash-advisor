
import { useReducer, useState } from 'react';
import './App.css'

import Result from './components/Result';
import Form from './components/Form';


const initialUserData = {
    age: 31,
    selfEmployed: false,
    sideHustle: false,
    availableToDeploy: 0,
    freeCash: 0,
    emergencyFund: false,
    highInterestDebt: 0,
    monthlyExpenses: 100,
    hasRetirementAccount: false,
    retirementAccountTypes: ["Roth IRA", "401k"],
    investmentGoals: [],
    hasHSA: false,
    riskTolerance: ''
}

function userDataReducer(state, action) {
    return { ...state, [action.type]: action.payload}
}




function App() {
    const [userData, userDispatch] = useReducer(userDataReducer, initialUserData);
    const [mainSection, setMainSection] = useState('intakeForm')

    return (
        <>
            <div className="header">
                <h1>Free Cash Advisor</h1>
            </div>
            <div className="mainContent">
                {mainSection === 'intakeForm' ? (
                    <div className="formContainer">
                      <Form 
                          userDispatch={userDispatch} 
                          userData={userData}
                          setMainSection={setMainSection}
                      />
                    </div>
                ) : mainSection === 'result' ? (
                    <div className="resultsContainer">
                        <Result userData={userData}/>
                    </div>

                ) : <div><h2>Ups, something went wrong</h2></div>
            }
              
               
               
            </div>
            <div className="footer"></div>

        </>
    )
}

export default App
