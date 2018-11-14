const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')


const User = require('../models/User')

users.use(cors())

process.env.SCRET_KEY = 'parkoon'

users.post('/register', (req, res) => {
    const today = new Date()
    const { first_name, last_name, email, password } = req.body
    const userData = {
        first_name,
        last_name,
        email,
        password,
        created: today
    }

    User.findOne({
        email,
    })
    .then(user => {
        if (user) {
            res.json({ error: 'User already exists' })
        } else {
            // 비밀번호 암호화 필요
            User.create(userData)
                .then(user => {
                    res.json({ status: `${user.email} is registered` })
                })
                .catch(err => {
                    res.send(`error: ${err}`)
                })
        }
    })
    .catch(err => {
        res.send(`error: ${err}`)
    })
})

users.post('/login', (req, res) => {
    const { email } = req.body

    User.findOne({
        email,
    })
    .then(user => {
        if (user) {
            const { _id, first_name, last_name, email } = user
            const payload = {
                _id,
                first_name,
                last_name,
                email,
            }

            const token = jwt.sign(payload, process.env.SCRET_KEY, {
                expiresIn: 1440
            })

            res.json({ token })
        } else {
            res.json({ error: 'User does not exist'})
        }
    })
    .catch(err => { res.send(`error: ${err}`)})

})

module.exports = users