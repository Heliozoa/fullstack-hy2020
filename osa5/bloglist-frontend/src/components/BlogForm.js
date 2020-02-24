import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = () => {
        blogService.newBlog(user, title, author, url).then(response => {
            setBlogs(blogs.concat(response.data))
        })
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={event => { event.preventDefault(); createBlog() }}>
            <div>title: <input onChange={event => setTitle(event.target.value)} /></div>
            <div>author: <input onChange={event => setAuthor(event.target.value)} /></div>
            <div>url: <input onChange={event => setUrl(event.target.value)} /></div>
            <button type="submit">create</button>
        </form>
    </div>
}

export default BlogForm
