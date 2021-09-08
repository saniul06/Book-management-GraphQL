const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
    }

    try {
        if (!token) {
            req.isAuth = false
            return next()
        }

        const decode = jwt.verify(token, 'ksajf234dsSDFJF_SDFJKsdf23sdf')
        if (!decode) {
            req.isAuth = false
            return next()
        }

        req.isAuth = true
        req.userId = decode.userId
        next()

    } catch (err) {
        req.isAuth = false
        next()
    }
}