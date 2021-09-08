const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    ratings:
        [
            {
                userId: {
                    type: mongoose.ObjectId,
                    required: true,
                    ref: 'User'
                },
                value: {
                    type: Number,
                    required: true
                }
            }
        ]
    ,
    user: {
        type: mongoose.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Book", bookSchema)