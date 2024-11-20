function Result ({userData}) {
    return (
        <>
            <h2>Results</h2>
            <p>Age: {userData.age}</p>
            <p>Self-Employed: {userData.selfEmployed ? "Yes" : "No"}</p>
            <p>Free Cash: {userData.freeCash}</p>
        </>
    );
}


export default Result