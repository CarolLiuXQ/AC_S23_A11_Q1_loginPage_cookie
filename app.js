const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// const router = express.Router()

require('./config/mongoose')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  res.render('index')
})

app.listen(port, () => {
  console.log('http://localhost:3000')
})