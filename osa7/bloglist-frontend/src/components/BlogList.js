import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogList = ({ user, blogs, setBlogs }) => {

  const remove = (id) => {
    if (window.confirm('are you sure you want to delete the blog?')) {
      blogService.remove(user, id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const like = (blog, likes, setLikes) => {
    const updated = {
      ...blog,
      likes: likes + 1,
    }
    setLikes(likes + 1)
    blogService.update(updated)
  }

  return <div>
    <br />
    {blogs
      .sort((b1, b2) => b1.likes < b2.likes)
      .map(blog =>
        <Blog user={user} key={blog.id} blog={blog} handleRemove={remove} like={like} />
      )}
  </div>
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
