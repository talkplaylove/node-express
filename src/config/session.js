const session = require('express-session')

module.exports = session({
  secret: 'N@D$EXP&ESS',
  resave: false,
  saveUninitialized: true
})