const express = require('express')
const router = express.Router()

const userService = require('../services/user-service')
const CustomError = require('../advice/custom-error')

router.post('/signin', async (req, res) => {
  let { email, password } = req.body
  try {
    let user = await userService.signin(email, password)
    return res.json(user)
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json(err)
    }
    return res.status(500).json(err)
  }
})

module.exports = router
