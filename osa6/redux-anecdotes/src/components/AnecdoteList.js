import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setVote, unset, setTimer } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const timer = useSelector(state => state.notification.timer)
    const dispatch = useDispatch()

    const doVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setVote(anecdote.content))
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            dispatch(unset())
        }, 5000)
        dispatch(setTimer(newTimer))
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
