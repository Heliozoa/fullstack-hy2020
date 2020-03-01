export const setNotification = (message, time) => {
    return async dispatch => {
        const timer = setTimeout(() => {
            dispatch({
                type: 'CLEAR NOTIFICATION',
                data: { timer }
            })
        }, time * 1000)
        dispatch({
            type: 'SET NOTIFICATION',
            data: { message, timer }
        })
    }
}

const initialState = {
    message: null,
    timer: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET NOTIFICATION': {
            const { message, timer } = action.data
            return {
                ...state,
                message,
                timer
            }
        }
        case 'CLEAR NOTIFICATION': {
            const timer = action.data.timer
            if (timer !== state.timer) {
                return state
            }
            return {
                ...state,
                message: null
            }
        }
        default:
            return state
    }
}

export default reducer