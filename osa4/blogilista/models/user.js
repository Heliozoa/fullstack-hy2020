const mongoose = require('mongoose')

const schema = mongoose.Schema({
    id: String,
    username: { type: String, required: true },
    name: { type: String, required: true },
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = mongoose.model('user', schema)

module.exports = User
