function Result ({userData}) {
    return (
        <>
            <h2>Results</h2>
            <p>Age: {userData.age}</p>
            <p>Self-Employed: {userData.selfEmployed ? "Yes" : "No"}</p>
            <p>Free Cash: {userData.freeCash}</p>
            <p>High interest Debpt: {userData.highInterestDebt}</p>
            <p>Available to deploy: {userData.availableToDeploy}</p>
        </>
    );
}


export default Result