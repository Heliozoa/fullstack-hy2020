import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ user, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const toggle = () => {
    setVisible(!visible)
  }

  const create = (event) => {
    event.preventDefault()
    createBlog(user, title, author, url)
    toggle()
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  if (visible) {
    return <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>title: <input id="title" onChange={event => setTitle(event.target.value)} /></div>
        <div>author: <input id="author" onChange={event => setAuthor(event.target.value)} /></div>
        <div>url: <input id="url" onChange={event => setUrl(event.target.value)} /></div>
        <button id="create" type="submit">create</button>
      </form>
      <div><button onClick={toggle}>cancel</button></div>
    </div>
  } else {
    return <div><button id="show" onClick={toggle}>new blog</button></div>
  }
}

BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
