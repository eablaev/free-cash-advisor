
import { useReducer } from 'react';
import './App.css'

import Result from './components/Result';
import Form from './components/Form';


const initialUserData = {
    age: '',
    selfEmployed: false,
    freeCash:0,
    highInterestDebt: 0,
    monthlyExpenses: 0
}

function userDataReducer(state, action) {
    return { ...state, [action.type]: action.payload}
}



function App() {
   const [userData, userDispatch] = useReducer(userDataReducer, initialUserData);

    return (
        <>
            <div className="header">
                <h1>Free Cash Advisor</h1>
            </div>
            <div className="mainContent">
                <div className="formContainer">
                    <Form 
                        userDispatch={userDispatch} 
                        userData={userData}
                    />
                </div>
                <div className="resultsContainer">
                    <Result userData={userData}/>
                </div>
               
            </div>
            <div className="footer"></div>

        </>
    )
}

export default App
