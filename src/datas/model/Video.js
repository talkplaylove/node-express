const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collectionName = 'Video'
const Video = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, require: true},
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  versionKey: false
})

module.exports = mongoose.model(collectionName, Video)