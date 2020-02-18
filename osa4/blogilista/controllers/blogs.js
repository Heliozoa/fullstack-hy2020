const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
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
