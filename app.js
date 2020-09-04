var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var errorHandler = require('./src/advice/error-handler')
var sessionConfig = require('./src/config/session')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(sessionConfig)

app.use('/user', require('./src/routes/user-route'))
app.use('/boards', require('./src/routes/boards-route'))

app.use(errorHandler)

module.exports = app
