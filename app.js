const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const cookieParser = require('cookie-parser')

require('./config/mongoose')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(cookieParser())
app.use(routes)



app.listen(port, () => {
  console.log('http://localhost:3000/login')
})