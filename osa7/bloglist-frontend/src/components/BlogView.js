import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../redux-helper'

const BlogView = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(b => b.id === id)
    const dispatch = useDispatch()

    const like = () => {
        const newBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        blogService.update(newBlog)
        dispatch(updateBlog(newBlog))
    }

    if (blog === undefined) {
        return <div>no such blog found</div>
    }

    console.log(blog)
    return <>
        <h2>{blog.title}</h2>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={like}>like</button></div>
        <div>added by {blog.user.name}</div>
    </>
}

export default BlogView
