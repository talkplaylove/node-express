const express = require('express')
const router = express.Router()

const Video = require('../datas/model/Video')
const DateUtils = require('../utils/date.util')

router.get('/', (req, res, next) => {
  const { page, size } = req.query
  const limit = Number(size)

  Video.find()
    .limit(limit)
    .skip(page * limit)
    .sort({ _id: 'asc' })
    .exec((err, docs) => {
      if (err) return next(err)
      return res.json(docs.map(doc => ({
        _id: doc._id,
        thumbnail: doc.thumbnail,
        title: doc.title,
        likes: doc.likes,
        displayedAt: DateUtils.displayedAt(doc.createdAt)
      })))
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