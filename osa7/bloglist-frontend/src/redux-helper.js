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

export const initBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: { blogs }
    }
}

export const addBlog = (blog) => {
    return {
        type: 'ADD_BLOG',
        data: { blog }
    }
}

export const removeBlog = (blog_id) => {
    return {
        type: 'REMOVE_BLOG',
        data: { blog_id }
    }
}

export const updateBlog = (blog) => {
    return {
        type: 'UPDATE_BLOG',
        data: { blog }
    }
}

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data.blogs
        case 'ADD_BLOG':
            return state.concat(action.data.blog)
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data.blog_id)
        case 'UPDATE_BLOG':
            const blog = action.data.blog
            return state
                .filter(b => b.id !== blog.id)
                .concat(blog)
        default:
            return state
    }
}

const reducer = combineReducers({ notification: notificationReducer, blogs: blogsReducer })
export const store = createStore(reducer)
