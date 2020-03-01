import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import aReducer from './reducers/anecdoteReducer'
import nReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: aReducer,
    notification: nReducer
})

const store = createStore(
    reducer,
    composeWithDevTools())

export default store