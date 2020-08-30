var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var CustomError = require('./src/advice/custom-error')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Session Configuration
app.use(session({
  secret: 'N@D$EXP&ESS',
  resave: false,
  saveUninitialized: true
}))

// Routes
app.use('/user', require('./src/routes/user-route'))

// Error Handler
app.use(function (err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.code).json(err)
  }
  console.log(err)
  return res.status(500).json(err)
})

module.exports = app
