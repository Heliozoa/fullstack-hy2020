const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
    const db_users = await User.find({})
    const users = db_users.map(u => u.toJSON())
    response.json(users)
})

router.post('/', async (request, response) => {
    const user = new User(request.body)
    const result = await user.save()
    response.status(201).send(result)
})

module.exports = router
