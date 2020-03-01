import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { init } from './reducers/anecdoteReducer'
import { getAll } from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAll().then(anecdotes => dispatch(init(anecdotes)))
  })

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App