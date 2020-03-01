import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
    }

    return <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
    </form>
}

export default AnecdoteForm