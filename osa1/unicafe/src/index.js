import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({ good, neutral, bad, setGood, setNeutral, setBad }) => {
    const incGood = () => { setGood(good + 1) }
    const incNeutral = () => { setNeutral(neutral + 1) }
    const incBad = () => { setBad(bad + 1) }

    return <>
        <h2>give feedback</h2>
        <button onClick={incGood}>good</button>
        <button onClick={incNeutral}>neutral</button>
        <button onClick={incBad}>bad</button>
    </>
}

const Statistics = ({ good, neutral, bad }) => (
    <>
        <h2>statistics</h2>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
    </>
)


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <Feedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)