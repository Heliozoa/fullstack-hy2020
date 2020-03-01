import { createAnecdote, getAll, voteAnecdote } from '../services/anecdotes'

export const vote = (id) => {
  return async dispatch => {
    const anecdote = await voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: { anecdote }
    })
  }
}

export const create = (contents) => {
  return async dispatch => {
    const anecdote = await createAnecdote(contents)
    dispatch({
      type: 'CREATE',
      data: { anecdote }
    })
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT',
      data: { anecdotes }
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const anecdote = action.data.anecdote
      const newState = state.map(a => a.id === anecdote.id ? anecdote : a)
      newState.sort((a1, a2) => a2.votes - a1.votes)
      return newState
    case 'CREATE':
      const newAnecdote = action.data.anecdote
      return [...state, newAnecdote]
    case 'INIT':
      const anecdotes = action.data.anecdotes
      anecdotes.sort((a1, a2) => a2.votes - a1.votes)
      return anecdotes
    default:
      return state
  }
}

export default reducer