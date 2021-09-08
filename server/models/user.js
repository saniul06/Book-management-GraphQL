const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true,
        select: false
    },
    bookList: [
        {
            type: mongoose.ObjectId,
            ref: "Book"
        }
    ]
})

// Encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// create jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { userId: this._id },
        "ksajf234dsSDFJF_SDFJKsdf23sdf",
        { expiresIn: '2h' }
    )

    // return { userId: this._id, token, tokenExpiration: 2 }
}

module.exports = mongoose.model('User', userSchema)