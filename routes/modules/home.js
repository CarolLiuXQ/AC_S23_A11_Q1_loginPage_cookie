const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', (req, res) => {
  const cookieId = req.cookies.id
  //認證是誰然後顯現出個人資料
  return User.find({ _id: cookieId })
    .lean()
    .then(user => {
      res.render('home', { user: user[0] })
    })
    .catch(error => console.log(error))
})


module.exports = router