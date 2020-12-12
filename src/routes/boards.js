const express = require('express')
const router = express.Router()

const Board = require('../datas/model/Board')

router.get('/', (req, res, next) => {
  const { keyword } = req.query
  if (keyword) {
    Board.find({
      title: {
        $regex: `.*${keyword}.*`
      }
    }, (err, docs) => {
      if (err) return next(err)
      return res.json(docs)
    })
  } else {
    Board.find((err, docs) => {
      if (err) return next(err)
      return res.json(docs)
    })
  }
})

router.get('/:boardId', (req, res, next) => {
  const { boardId } = req.params

  Board.findById(boardId, (err, doc) => {
    if (err) return next(err)
    return res.json(doc == null ? {} : doc)
  })
})

router.post('/', (req, res, next) => {
  const { title, content } = req.body

  const board = new Board({
    title: title,
    content: content
  })
  board.save((err, doc) => {
    if (err) return next(err)
    return res.json(doc)
  })
})

router.patch('/:boardId', (req, res, next) => {
  const { boardId } = req.params
  const { title, content } = req.body

  Board.updateOne({ _id: boardId },
    {
      $set: {
        title: title,
        content: content
      }
    }, (err, raw) => {
      if (err) return next(err)
      return res.json(raw)
    })
})

router.delete('/:boardId', (req, res, next) => {
  const { boardId } = req.params

  Board.deleteOne({ _id: boardId }, (err, raw) => {
    if (err) return next(err)
    return res.json(raw)
  })
})

router.put('/:boardId/like', (req, res, next) => {
  const { boardId } = req.params

  Board.updateOne({ _id: boardId },
    {
      $inc: {
        likes: 1
      }
    }, (err, raw) => {
      if (err) return next(err)
      return res.json(raw)
    })
})

module.exports = router