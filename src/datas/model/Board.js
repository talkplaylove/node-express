const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collectionName = 'Board'
const Board = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likeCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model(collectionName, Board)