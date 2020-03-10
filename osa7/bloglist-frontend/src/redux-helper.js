import { createStore } from 'redux'

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.message
        case 'RESET_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const store = createStore(notificationReducer)
