import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, user, mock }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const toggle = () => {
    setVisible(!visible)
  }

  const createBlog = () => {
    mock(user, title, author, url)
    blogService.newBlog(user, title, author, url).then(response => {
      setBlogs(blogs.concat(response.data))
    })
    toggle()
  }


  if (visible) {
    return <div>
      <h2>create new</h2>
      <form onSubmit={event => { event.preventDefault(); createBlog() }}>
        <div>title: <input id="title" onChange={event => setTitle(event.target.value)} /></div>
        <div>author: <input id="author" onChange={event => setAuthor(event.target.value)} /></div>
        <div>url: <input id="url" onChange={event => setUrl(event.target.value)} /></div>
        <button id="create" type="submit">create</button>
      </form>
      <div><button onClick={toggle}>cancel</button></div>
    </div>
  } else {
    return <div><button id="show" onClick={toggle}>new note</button></div>
  }
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogForm
