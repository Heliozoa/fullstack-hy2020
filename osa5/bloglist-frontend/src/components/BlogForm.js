import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const toggle = () => {
    setVisible(!visible)
  }

  const createBlog = () => {
    blogService.newBlog(user, title, author, url).then(response => {
      setBlogs(blogs.concat(response.data))
    })
    toggle()
  }


  if (visible) {
    return <div>
      <h2>create new</h2>
      <form onSubmit={event => { event.preventDefault(); createBlog() }}>
        <div>title: <input onChange={event => setTitle(event.target.value)} /></div>
        <div>author: <input onChange={event => setAuthor(event.target.value)} /></div>
        <div>url: <input onChange={event => setUrl(event.target.value)} /></div>
        <button type="submit">create</button>
      </form>
      <div><button onClick={toggle}>cancel</button></div>
    </div>
  } else {
    return <div><button onClick={toggle}>new note</button></div>
  }
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogForm
