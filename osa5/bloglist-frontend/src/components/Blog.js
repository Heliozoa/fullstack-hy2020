import React, { useState } from 'react'

const Blog = ({ blog, handleRemove, like }) => {
  const [detailedView, setDetailedView] = useState(false)
  const [likes, setLikes] = useState(blog.likes ? blog.likes : 0)

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
        likes {likes}
        <button onClick={() => like(blog, likes, setLikes)}>like</button>
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
