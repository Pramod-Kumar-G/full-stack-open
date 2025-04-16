import { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    let average = (good - bad) / total
    let positive = good * 100 / total
    if (total === 0) {
        average = 0
        positive = 0
    }
    return (
        <>
            <h2>Statistics</h2>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <p>All {total}</p>
            <p>Average {average}</p>
            <p>Positive {positive} %</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    return (
        <>
            <h2>Give Feedback</h2>
            <button onClick={() => setGood(good + 1)}>Good</button>
            <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App
