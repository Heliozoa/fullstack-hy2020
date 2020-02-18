const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    }
]

const users = [
    {
        _id: "5e4c52fa21a6423f47929a53",
        username: "mat",
        name: "Matti",
        password: "123",
        __v: 0
    },
    {
        _id: "5e4c52fd9d22702fc5612f1a",
        username: "art",
        name: "Arto",
        password: "321",
        __v: 0
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let userPromises = users.map(u => new User(u).save())
    let blogPromises = initialBlogs.map(b => new Blog(b).save())
    await Promise.all(blogPromises.concat(userPromises))
})

test('right amount of blogs returned', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(6)
})

test('database[_id] translated to object[id]', async () => {
    const response = await api
        .get('/api/blogs')

    for (blog of response.body) {
        expect(initialBlogs.find(b => blog.id === b._id)).toBeDefined()
    }
})

test('can add blog with post', async () => {
    const newBlog = new Blog({
        id: "1",
        title: "2",
        author: "3",
        url: "3",
        likes: 4,
        user: "5e4c52fd9d22702fc5612f1a",
    })

    const added = await api
        .post('/api/blogs')
        .send(newBlog)


    const response = await api
        .get('/api/blogs')


    expect(response.body.find(b => b.id === added.body.id)).toBeDefined()
    expect(response.body.length).toBe(7)
})


test('post with no likes defaults to 0', async () => {
    const newBlog = new Blog({
        id: "1",
        title: "2",
        author: "3",
        url: "3",
        user: "5e4c52fd9d22702fc5612f1a",
    })

    const added = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(added.body.likes).toBe(0)
})


test('post with no title leads to 400', async () => {
    const newBlog = new Blog({
        id: "1",
        author: "3",
        url: "3",
        user: "5e4c52fd9d22702fc5612f1a",
    })

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(response.status).toBe(400)
})


test('post with no url leads to 400', async () => {
    const newBlog = new Blog({
        id: "1",
        title: "2",
        author: "3",
        user: "5e4c52fd9d22702fc5612f1a",
    })

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(response.status).toBe(400)
})


test('deletion works', async () => {
    const id = "5a422a851b54a676234d17f7"
    const response = await api
        .delete(`/api/blogs/${id}`)

    expect(response.status).toBe(200)

    const blogs = await api
        .get('/api/blogs')
    expect(blogs.body.length).toBe(5)
})

test('update works', async () => {
    const id = "5a422a851b54a676234d17f7"
    const response = await api
        .put(`/api/blogs/${id}`)
        .send(
            { id, title: "1", author: "2", url: "3", likes: 4 }
        )

    expect(response.status).toBe(200)

    const blogs = await api
        .get('/api/blogs')
    expect(blogs.body.length).toBe(6)
    const updated = blogs.body.find(b => b.id === id)
    expect(updated.title).toBe("1")
    expect(updated.author).toBe("2")
    expect(updated.url).toBe("3")
    expect(updated.likes).toBe(4)
})

test('get populates users', async () => {
    const blogs = await api
        .get('/api/blogs')
    for (blog of blogs.body) {
        expect(blog.user).toEqual({
            id: "5e4c52fa21a6423f47929a53",
            username: "mat",
            name: "Matti",
        })
    }
})

afterAll(() => {
    mongoose.connection.close()
})