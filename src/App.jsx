
import { useReducer } from 'react';
import './App.css'

import Result from './components/Result';
import Form from './components/Form';


const initialUserData = {
    age: '',
    selfEmployed: false,
    freeCash: 0,
    highInterestDebt: 0
}

function userDataReducer(state, action) {
    switch (action.type) {
        case 'SET_AGE':
            return { ...state, age: action.payload};
        case 'TOGGLE_SELF_EMPLOYED':
            return { ...state, selfEmployed: !state.selfEmployed }
        case 'SET_FREE_CASH':
            return { ...state, freeCash: action.payload}
        default:
             return state
    }

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
