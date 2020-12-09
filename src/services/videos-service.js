const Video = require('../datas/model/Video')
const CustomError = require('../advice/custom-error')

exports.getVideos = () => {
  return new Promise((resolve, reject) => {
    Video.find((err, docs) => {
      if (err) reject(err)
      resolve(docs)
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