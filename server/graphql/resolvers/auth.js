const bcrypt = require('bcryptjs')
const User = require('../..//models/user')

module.exports = {
    register: async (args) => {
        try {

            if (!args.userInput.email || !args.userInput.password) {
                throw new Error("Please provide email and password")
            }

            const email = await User.findOne({ email: args.userInput.email })
            if (email) {
                throw new Error("Email already exists")
            }

            const user = await new User({
                email: args.userInput.email,
                password: args.userInput.password
            })
            await user.save()
            return { message: "Registration successfull" }

        } catch (err) {
            throw err
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email }).select('+password')
            if (!user) {
                throw new Error("Invalid credentials")
            }

            const isPasswordMatched = await user.comparePassword(password)
            if (!isPasswordMatched) {
                throw new Error("Invalid credentials")
            }

            const token = user.getJwtToken()

            return { success: true, userId: user._id, token: `Bearer ${token}` }

        } catch (err) {
            throw err
        }

    }
}