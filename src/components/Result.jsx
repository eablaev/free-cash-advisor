import { use } from 'react';
import styles from './Result.module.css'


function Result ({userData}) {
    return (
        <div className={styles.resultContainer}>
            <div className={styles.img}>img</div>
            <h4 className={styles.resultItem}>Age: {userData.age}</h4>
            <h4 className={styles.resultItem}>Available to invest : ${userData. availableToDeploy}</h4>
            <h4 className={styles.resultItem}>High Interest Debt: ${userData.highInterestDebt}</h4>
            <h4 className={styles.resultItem}>Monthly Expenses: ${userData.monthlyExpenses}</h4>
            <h4 className={styles.resultItem}>Self employed: {userData.selfEmployed ? 'Yes' : 'No'}</h4>

            <h4 className={styles.resultItem}>Emergency Fund: {userData.emergencyFund ? 'Yes' : 'No'}</h4>
            {userData.retirementAccountTypes.length > 0 && (
                <div className={styles.resultItem}>
                    <h4>Retirement Accounts:</h4>
                    <p>{userData.retirementAccountTypes.join(", ")}</p>
                
                </div>
            )}
            <h4 className={styles.resultItem}>HSA: {userData.hasHSA ? 'Yes' : 'No'}</h4>
            <h4 className={styles.resultItem}>Investment Goals: {userData.investmentGoals}</h4>
            <h4 className={styles.resultItem}>Risk Tolerance: {userData.riskTolerance}</h4>

            
           
            
        </div>
    );
}


export default Result