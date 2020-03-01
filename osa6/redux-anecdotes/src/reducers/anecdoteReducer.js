import { createAnecdote, getAll } from '../services/anecdotes'

export const vote = (id) => {
  console.log(id)
  return {
    type: 'VOTE',
    data: { id }
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
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const changed = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
      const newState = state.map(a => a.id === id ? changed : a)
      newState.sort((a1, a2) => a2.votes - a1.votes)
      return newState
    case 'CREATE':
      const newAnecdote = action.data.anecdote
      return [...state, newAnecdote]
    case 'INIT':
      const anecdotes = action.data.anecdotes
      return anecdotes
    default:
      return state
  }
}

export default reducer