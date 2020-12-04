const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

module.exports = mongoose.model('Boards', new Schema({
  title: { type: String },
  content: { type: String },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, {
  versionKey: false
}))