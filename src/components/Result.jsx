function Result ({userData}) {
    return (
        <>
            {Object.entries(userData).map(([key, value], index) => (
                <div key={index}>
                    <h4>{key}:</h4>
                    {Array.isArray(value) ? (
                        value.map((item,index) => (
                            <h5 key={index}>{item}</h5>
                        ))
                    ) : typeof value === "boolean"  ? (
                        <h5>{value ? 'Yes' : 'No'}</h5>    
                    ) : 
                    <h5>{value}</h5> }
                </div>
            ))}
            
        </>
    );
}


export default Result