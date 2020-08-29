const express = require('express')
const router = express.Router()

const userService = require('../services/user-service')
const CustomError = require('../advice/custom-error')

router.post('/signin', async (req, res) => {
  let { email, password } = req.body
  let session = req.session
  try {
    let resBody = await userService.signin(email, password)
    session.userId = resBody.id
    session.userName = resBody.name
    return res.json(resBody)
  } catch (err) {
    console.log(err)
    if (err instanceof CustomError) {
      return res.status(err.code).json(err)
    }
    return res.status(500).json(err)
  }
})

router.post('/signup', async (req, res) => {
  let user = req.body
  try {
    let resBody = await userService.signup(user)
    return res.json(resBody)
  } catch (err) {
    console.log(err)
    if (err instanceof CustomError) {
      return res.status(err.code).json(err)
    }
    return res.status(500).json(err)
  }
})

router.get('/email/duplicate', async (req, res) => {
  let { email } = req.query
  try {
    let resBody = await userService.duplicateEmail(email)
    return res.json(resBody)
  } catch (err) {
    console.log(err)
    if (err instanceof CustomError) {
      return res.status(err.code).json(err)
    }
    return res.status(500).json(err)
  }
})

router.get('/name/duplicate', async (req, res) => {
  let { name } = req.query
  try {
    let resBody = await userService.duplicateName(name)
    return res.json(resBody)
  } catch (err) {
    console.log(err)
    if (err instanceof CustomError) {
      return res.status(err.code).json(err)
    }
    return res.status(500).json(err)
  }
})

module.exports = router
