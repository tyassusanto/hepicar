const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const commonHelper = require('../common/common')

const modelUsers = require('../models/users')

const addUser = async (req, res, next) => {
    try {
        const {email, full_name, password} = req.body;
        const userEmail = await modelUsers.findEmail(email)
        if(userEmail.length > 0){
            return next(createError(403, 'email sudah terdaftar'))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const insertDataUser = {
            user_id : uuid(),
            email,
            full_name,
            password : hashPassword 
        }
        const resultAddUser = await modelUsers.addUser(insertDataUser)
        res.status(200)
        commonHelper.response(res, {email, full_name}, 200, 'berhasil register')
    } catch (error) {
        console.log(error)
        res.status(500),
        next({
            status : 500,
            message : 'Internal Server Error'
        })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const [user] = await modelUsers.findEmail(email)
        if (!user) return next(createError(403, 'Email Salah'))
        const hashedPassword = await bcrypt.compare(password, user.password)
        if (!hashedPassword) return next(createError(403, 'Password Salah'))
        const secretKey = process.env.SECRET_JWT
        const payload = {
            name: user.full_name,
            email: user.email,
            profilePic: user.profile_pic,
        }
        const verifToken = {
            expiresIn: '1 day'
        }
        const token = jwt.sign(payload, secretKey, verifToken)
        user.token = token
        const result = {
            id: user.user_id,
            email: user.email,
            name: user.full_name,
            pofilePic: user.profile_pic,
            token
        }
        res.json({
            code: 200,
            data: result
        })

    } catch (error) {
        res.status(500)
    }
}

module.exports = {
    loginUser,
    addUser
}