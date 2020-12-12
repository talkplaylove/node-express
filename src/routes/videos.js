const express = require('express')
const router = express.Router()

const Video = require('../datas/model/Video')

router.get('/', (req, res, next) => {
  Video.find((err, docs) => {
    if (err) return next(err)
    return res.json(docs)
  })
})

router.get('/:videoId', (req, res, next) => {
  const { videoId } = req.params

  Video.findById(videoId, (err, doc) => {
    if (err) return next(err)
    return res.json(doc)
  })
})

router.post('/', (req, res, next) => {
  const { title, thumbnail } = req.body

  const video = new Video({
    title: title,
    thumbnail: thumbnail
  })
  video.save((err, doc) => {
    if (err) return next(err)
    return res.json(doc)
  })
})

module.exports = router