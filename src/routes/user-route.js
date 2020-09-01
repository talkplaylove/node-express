const express = require('express')
const router = express.Router()

const userService = require('../services/user-service')

router.post('/signin', async (req, res, next) => {
  let { email, password } = req.body
  let session = req.session
  try {
    let resBody = await userService.signin(email, password)
    session.userId = resBody.id
    session.userName = resBody.name
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  let user = req.body
  try {
    let resBody = await userService.signup(user)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.get('/email/duplicate', async (req, res, next) => {
  let { email } = req.query
  try {
    let resBody = await userService.duplicateEmail(email)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.get('/name/duplicate', async (req, res, next) => {
  let { name } = req.query
  try {
    let resBody = await userService.duplicateName(name)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

module.exports = router
