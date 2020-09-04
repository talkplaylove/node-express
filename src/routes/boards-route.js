const express = require('express')
const router = express.Router()

const boardService = require('../services/board-service')

router.get('/:boardId', async (req, res, next) => {
  let { boardId } = req.params
  try {
    let resBody = await boardService.getBoard(boardId)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  let { page, size } = req.query
  try {
    let resBody = await boardService.getBoards(Number(page), Number(size))
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  let board = req.body
  let { userId } = req.session
  try {
    let resBody = await boardService.createBoard(board, userId)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  let board = req.body
  let { userId } = req.session
  try {
    let resBody = await boardService.createBoard(board, userId)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.patch('/:boardId', async (req, res, next) => {
  let { boardId } = req.params
  let board = req.body
  let { userId } = req.session
  try {
    let resBody = await boardService.updateBoard(boardId, board, userId)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

router.delete('/:boardId', async (req, res, next) => {
  let { boardId } = req.params
  let { userId } = req.session
  try {
    let resBody = await boardService.deleteBoard(boardId, userId)
    return res.json(resBody)
  } catch (err) {
    next(err)
  }
})

module.exports = router