const express = require('express')
const router = express.Router()

const videoService = require('../services/videos-service')

router.get('/', (req, res, next) => {
  videoService.getVideos()
      .then(videos => res.json(videos))
      .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const body = req.body

  videoService.createVideo(body)
    .then(video => res.json(video))
    .catch(err => next(err))
})

module.exports = router