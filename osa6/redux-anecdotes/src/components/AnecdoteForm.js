import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect, useDispatch } from 'react-redux'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(setNotification(`created ${content}`, 5))
    }

    return <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
    </form>
}

const mapStateToProps = (state) => {
    return {}
}

const ConnectedAnecdoteForm = connect(mapStateToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
