import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { setCreate, unset, setTimer } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const timer = useSelector(state => state.notification.timer)
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(setCreate(content))
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            dispatch(unset())
        }, 5000)
        dispatch(setTimer(newTimer))
    }

    return <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
    </form>
}

export default AnecdoteForm
