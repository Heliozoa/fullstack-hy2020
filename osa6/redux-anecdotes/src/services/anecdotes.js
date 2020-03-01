import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async (anecdote) => {
    const newAnecdote = {
        content: anecdote,
        votes: 0,
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

export const voteAnecdote = async (id) => {
    const anecdotes = await getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    const updated = {
        ...anecdote,
        votes: anecdote.votes + 1,
    }
    const response = await axios.put(`${baseUrl}/${id}`, updated)
    return response.data
}

