const express = require('express')
const router = express.Router()

const Boards = require('../datas/model/Boards')

router.get('/', (req, res, next) => {
  Boards.find((err, board) => {
    if (err) next(err)
    res.json(board)
  })
})

router.post('/', (req, res, next) => {
  const { title, content } = req.body
  const boards = new Boards({
    title: title,
    content: content
  })
  boards.save((err, board) => {
    if (err) next(err)
    res.json(board)
  })
})

module.exports = router