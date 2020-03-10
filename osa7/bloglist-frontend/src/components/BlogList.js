import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { removeBlog, likeBlog } from '../redux-helper'
import { useDispatch } from 'react-redux'

const BlogList = ({ user, blogs, setBlogs }) => {
  const dispatch = useDispatch()

  const remove = (id) => {
    if (window.confirm('are you sure you want to delete the blog?')) {
      blogService.remove(user, id)
      dispatch(removeBlog(id))
    }
  }

  return <div>
    <br />
    {blogs
      .sort((b1, b2) => b1.likes < b2.likes)
      .map(blog =>
        <Blog user={user} key={blog.id} blog={blog} />
      )}
  </div>
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
