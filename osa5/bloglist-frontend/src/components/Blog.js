import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false)

  const toggle = () => {
    setDetailedView(!detailedView)
  }

  const like = () => {}

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
