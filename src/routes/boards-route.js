const express = require('express')
const router = express.Router()

const boardService = require('../services/boards-service')

router.get('/', (req, res, next) => {
  const { keyword } = req.query

  keyword
    ? boardService.searchBoards(keyword)
      .then(boards => res.json(boards))
      .catch(err => next(err))
    : boardService.getBoards()
      .then(boards => res.json(boards))
      .catch(err => next(err))
})

router.get('/:boardId', (req, res, next) => {
  const { boardId } = req.params

  boardService.getBoard(boardId)
    .then(board => res.json(board == null ? {} : board))
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const body = req.body

  boardService.createBoard(body)
    .then(board => res.json(board))
    .catch(err => next(err))
})

router.patch('/:boardId', (req, res, next) => {
  const { boardId } = req.params
  const body = req.body

  boardService.updateBoard(boardId, body)
    .then(raw => res.json(raw))
    .catch(err => next(err))
})

router.delete('/:boardId', (req, res, next) => {
  const { boardId } = req.params

  boardService.deleteBoard(boardId)
    .then(raw => res.json(raw))
    .catch(err => next(err))
})

router.put('/:boardId/like', (req, res, next) => {
  const { boardId } = req.params

  boardService.likeBoard(boardId)
    .then(raw => res.json(raw))
    .catch(err => next(err))
})

module.exports = router