const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog
        .find({})
        .populate('user')
    response.json(result.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const users = await User.find({})
    const user = users[0]
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
    })
    const result = await blog.save()
    response.status(201).send(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const result = await Blog.deleteOne({ _id: id })
    response.status(200).send(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const id = request.params.id
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const result = await Blog.findByIdAndUpdate(id, blog)
    response.status(200).send(result)
})

module.exports = blogsRouter
