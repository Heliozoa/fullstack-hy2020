import { createStore, combineReducers } from 'redux'
import BlogForm from './components/BlogForm'

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

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data.blogs
        case 'ADD_BLOG':
            return state.concat(action.data.blog)
        default:
            return state
    }
}

const reducer = combineReducers({ notification: notificationReducer, blogs: blogsReducer })
export const store = createStore(reducer)
