const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const login = require('./modules/login')
const profile = require('./modules/profile')

router.use('/home', home)
router.use('/login', login)
router.use('/profile', profile)


module.exports = router