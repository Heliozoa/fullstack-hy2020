const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
        user: "5e4c52fa21a6423f47929a53",
    },
]

const users = [
    {
        _id: "5a422a851b54a676234d17f7",
        username: "mat",
        name: "Matti",
        password: "123",
        __v: 0,
        blogs: ["5a422a851b54a676234d17f7"],
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        username: "art",
        name: "Arto",
        password: "321",
        __v: 0,
        blogs: [],
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    let blogPromises = blogs.map(b => new Blog(b).save())
    let userPromises = users.map(u => new User(u).save())
    await Promise.all(blogPromises.concat(userPromises))
})

test('right amount of users returned with get', async () => {
    const response = await api
        .get('/api/users')

    expect(response.body.length).toBe(2)
})

test('can add user with post', async () => {
    const user = {
        username: "dan",
        name: "Daniel",
        password: "999",
    }
    await api
        .post('/api/users')
        .send(user)

    const response = await api
        .get('/api/users')

    expect(response.body.length).toBe(3)
})

test('short username rejected with 400', async () => {
    const user = {
        username: "d",
        name: "Daniel",
        password: "999",
    }
    const response = await api
        .post('/api/users')
        .send(user)
    expect(response.status).toBe(400)

    const users = await api
        .get('/api/users')

    expect(users.body.length).toBe(2)
})

test('users have blogs', async () => {
    const response = await api
        .get('/api/users')

    expect(response.body[0].blogs).toEqual([{
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }])
})

afterAll(() => {
    mongoose.connection.close()
})
