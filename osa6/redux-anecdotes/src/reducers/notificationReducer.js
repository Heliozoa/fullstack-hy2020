export const setVote = (anecdote) => {
    return {
        type: 'SET VOTE',
        data: { anecdote }
    }
}

export const setCreate = (anecdote) => {
    return {
        type: 'SET CREATE',
        data: { anecdote }
    }
}

export const unset = () => {
    return {
        type: 'UNSET'
    }
}

export const setTimer = (timer) => {
    return {
        type: 'SET TIMER',
        data: { timer },
    }
}

const initialState = {
    message: null,
    timer: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET VOTE': {
            const anecdote = action.data.anecdote
            return {
                ...state,
                message: `voted '${anecdote}'`
            }
        }
        case 'SET CREATE': {
            const anecdote = action.data.anecdote
            return {
                ...state,
                message: `created '${anecdote}'`,
            }
        }
        case 'SET TIMER': {
            const timer = action.data.timer
            return {
                ...state,
                timer
            }
        }
        case 'UNSET':
            return initialState
        default:
            return state
    }
}

export default reducer