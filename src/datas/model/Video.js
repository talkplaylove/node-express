const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collectionName = 'Video'
const Video = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, require: true},
  likeCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model(collectionName, Video)