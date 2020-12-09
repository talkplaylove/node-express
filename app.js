var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

require('./src/datas/mongodb')

app.use(cors())

app.use('/boards', require('./src/routes/boards-route'))
app.use('/videos', require('./src/routes/videos-route'))

app.use(require('./src/advice/error-handler'))

module.exports = app
