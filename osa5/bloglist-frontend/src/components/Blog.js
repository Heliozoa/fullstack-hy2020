import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleRemove }) => {
  const [detailedView, setDetailedView] = useState(false)
  const [likes, setLikes] = useState(blog.likes ? blog.likes : 0)

  const toggle = () => {
    setDetailedView(!detailedView)
  }

  const like = (blog) => {
    const updated = {
      ...blog,
      likes: likes + 1,
    }
    setLikes(likes + 1)
    blogService.update(updated)
  }

  if (detailedView) {
    return <div className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggle}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {likes}
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div><button onClick={() => handleRemove(blog.id)}>delete</button></div>
      <hr/>
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
