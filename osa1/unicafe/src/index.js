import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({ good, neutral, bad, all, average, positive, setGood, setNeutral, setBad, setAll, setAverage, setPositive }) => {
    const incGood = () => {
        const newGood = good + 1
        const newAll = all + 1

        setGood(newGood)
        setAll(newAll)
        setAverage((newGood - bad) / newAll)
        setPositive(newGood / newAll)
    }
    const incNeutral = () => {
        const newAll = all + 1

        setNeutral(neutral + 1)
        setAll(all + 1)
        setAverage((good - bad) / newAll)
        setPositive(good / newAll)
    }
    const incBad = () => {
        const newBad = bad + 1
        const newAll = all + 1

        setBad(newBad)
        setAll(newAll)
        setAverage((good - newBad) / newAll)
        setPositive(good / newAll)
    }

    return <>
        <h2>give feedback</h2>
        <button onClick={incGood}>good</button>
        <button onClick={incNeutral}>neutral</button>
        <button onClick={incBad}>bad</button>
    </>
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return <>
        <h2>statistics</h2>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positive}%</div>
    </>
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    return (
        <>
            <Feedback good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} setGood={setGood} setNeutral={setNeutral} setBad={setBad} setAll={setAll} setAverage={setAverage} setPositive={setPositive} />
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)