import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs }) => {
  return <div>
    <br />
    {blogs
      .sort((b1, b2) => b1.likes < b2.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
