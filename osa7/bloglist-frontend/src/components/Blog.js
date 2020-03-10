import React, { useState } from 'react'
import blogService from '../services/blogs'
import { updateBlog, removeBlog } from '../redux-helper'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [detailedView, setDetailedView] = useState(false)

  const like = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.update(newBlog)
    dispatch(updateBlog(newBlog))
  }

  const remove = () => {
    blogService.remove(user, blog.id)
    dispatch(removeBlog(blog.id))
  }

  const toggle = () => {
    setDetailedView(!detailedView)
  }

  if (detailedView) {
    return <div className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggle}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={like}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div><button onClick={remove}>delete</button></div>
      <hr />
    </div>
  } else {
    return <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggle}>view</button>
      <hr />
    </div>
  }

}

export default Blog
