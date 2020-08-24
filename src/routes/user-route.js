const express = require('express')
const router = express.Router()

const userService = require('../services/user-service')

router.post('/signin', function (req, res) {
  let { email, password } = req.body
  res.send('respond with a resource')
})

module.exports = router
