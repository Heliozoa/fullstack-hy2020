import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes }) => (
    <>
        <div>
            {anecdote}
        </div>
        <div>
            has {votes} votes
        </div>
    </>
)

const AnecdoteOfTheDay = ({ anecdotes, votes, selected, setVotes, setSelected }) => {
    const vote = () => {
        const newVotes = [...votes]
        newVotes[selected] = (newVotes[selected] | 0) + 1
        setVotes(newVotes)
    }

    const next = () => {
        const uusi = Math.floor(Math.random() * anecdotes.length)
        setSelected(uusi)
    }

    return <>
        <h2>Anecdote of the day</h2>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected] | 0} />
        <button onClick={vote}>vote</button>
        <button onClick={next}>next anecdote</button>
    </>
}

const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
    let max_index = 0
    for (let i = 0; i < votes.length; i++) {
        if (votes[i] > votes[max_index]) {
            max_index = i
        }
    }
    return <>
        <h2>Anecdote with most votes</h2>
        <Anecdote anecdote={anecdotes[max_index]} votes={votes[max_index] | 0} />
    </>
}

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState([])

    return (
        <>
            <AnecdoteOfTheDay anecdotes={anecdotes} votes={votes} selected={selected} setVotes={setVotes} setSelected={setSelected} />
            <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)