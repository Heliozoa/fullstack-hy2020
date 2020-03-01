import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(filter)))
    const dispatch = useDispatch()

    const doVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`voted for '${anecdote.content}'`, 5))
    }

    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => doVote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList
