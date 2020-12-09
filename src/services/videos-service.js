const Video = require('../datas/model/Video')
const DateUtils = require('../utils/date-utils')

exports.getVideos = () => {
  return new Promise((resolve, reject) => {
    Video.find((err, docs) => {
      let a = {
        a: 1,
        b: "3"
      }
      if (err) reject(err)
      let videos = docs.map(doc => ({
        _id: doc._id,
        title: doc.title,
        thumbnail: doc.thumbnail,
        likeCount: doc.likeCount,
        createdDiff: DateUtils.diffPerUnit(new Date(), doc.createdAt),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }))
      resolve(videos)
    })
  })
}

exports.createVideo = (body) => {
  const { title, thumbnail } = body
  return new Promise((resolve, reject) => {
    const video = new Video({
      title: title,
      thumbnail: thumbnail
    })
    video.save((err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}