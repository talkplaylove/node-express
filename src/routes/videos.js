const express = require('express')
const router = express.Router()

const Video = require('../datas/model/Video')

router.get('/', (req, res, next) => {
  Video.find((err, docs) => {
    if (err) next(err)
    res.json(docs)
  })
})

router.post('/', (req, res, next) => {
  const { title, thumbnail } = req.body

  const video = new Video({
    title: title,
    thumbnail: thumbnail
  })
  video.save((err, doc) => {
    if (err) next(err)
    res.json(doc)
  })
})

module.exports = router