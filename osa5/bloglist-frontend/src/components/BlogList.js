import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
    return <div>
        <br />
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
}

export default BlogList
