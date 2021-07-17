const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const invalidStatus = require('../../config/invalidStatus.json')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  return User.find()
    .lean()
    .then(users => {
      //確認有沒有這個email
      const user = users.find(user => user.email === email)
      //如果沒有此帳號
      if (user === undefined) {
        res.render('login', { emailInvalid: invalidStatus.emailInvalid })
      }
      //如果密碼錯誤
      else if (user.password !== password) {
        res.render('login', { passwordInvalid: invalidStatus.passwordInvalid, email })
      }
      //如果email和密碼對
      else if (user.password === password) {
        const mongooseId = user._id
        //設置cookie
        res.cookie('id', mongooseId, { maxAge: 120000 })
        res.redirect('/home')
      }
    })
    .catch(error => console.log(error))
})

module.exports = router