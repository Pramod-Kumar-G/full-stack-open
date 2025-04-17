import { useState } from "react"

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td> {value}</td>
        </tr>
    )
}
const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    let average = (good - bad) / total
    let positive = good * 100 / total
    if (total === 0) {
        return (
            <>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive + " %"} />
            </table>
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
            <Button text="Good" onClick={() => setGood(good + 1)} />
            <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="Bad" onClick={() => setBad(bad + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

export default App
