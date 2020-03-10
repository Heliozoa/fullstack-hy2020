import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'

const BlogList = ({ user, blogs }) => {
  return <div>
    <br />
    <ListGroup>
      {blogs
        .sort((b1, b2) => b1.likes < b2.likes)
        .map(blog =>
          <ListGroup.Item><Blog user={user} key={blog.id} blog={blog} /></ListGroup.Item>
        )}
    </ListGroup>
  </div>
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogList
