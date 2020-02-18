const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


const users = [
    { _id: "5a422a851b54a676234d17f7", username: "m", name: "Matti", password: "123", __v: 0 },
    { _id: "5a422aa71b54a676234d17f8", username: "a", name: "Arto", password: "321", __v: 0 },
]

beforeEach(async () => {
    await User.deleteMany({})
    let promises = users.map(u => new User(u).save())
    await Promise.all(promises)
})

test('right amount of users returned with get', async () => {
    const response = await api
        .get('/api/users')

    expect(response.body.length).toBe(2)
})

test('can add user with post', async () => {
    const user = {
        username: "d",
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

afterAll(() => {
    mongoose.connection.close()
})
