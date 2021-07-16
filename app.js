const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// const router = express.Router()
const User = require('./models/user')
const invalidStatus = require('./config/invalidStatus.json')

require('./config/mongoose')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

let firstName = ''

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/home', (req, res) => {
  res.render('home', { firstName })
})

app.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  return User.find()
    .lean()
    .then(users => {
      //確認有沒有這個email
      const user = users.find(user => user.email === email)
      //如果沒有此帳號
      if (user === undefined) {
        res.render('index', { emailInvalid: invalidStatus.emailInvalid })
      }
      //如果密碼錯誤
      else if (user.password !== password) {
        res.render('index', { passwordInvalid: invalidStatus.passwordInvalid })
      }
      //如果email和密碼對
      else if (user.password === password) {
        firstName = user.firstName
        res.redirect('/home')
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('http://localhost:3000')
})