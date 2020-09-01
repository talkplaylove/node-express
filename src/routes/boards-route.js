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

module.exports = router