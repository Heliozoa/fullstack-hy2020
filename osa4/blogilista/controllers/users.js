const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
    const db_users = await User
        .find({})
        .populate('blogs')
    const users = db_users.map(u => u.toJSON())
    response.json(users)
})

router.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10

    const password = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        password,
    })

    const result = await user.save()
    response.status(201).json(result)
})

module.exports = router
