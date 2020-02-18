const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        for (blog of returnedObject.blogs) {
            delete blog.user
        }
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

schema.plugin(uniqueValidator)
const User = mongoose.model('User', schema)

module.exports = User
