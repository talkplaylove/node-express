const mongoose = require('mongoose')

console.log(`Connecting to mongo database...`)
mongoose.connect('mongodb://localhost:27017/demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const connection = mongoose.connection
connection.on('error', console.error)
connection.once('open', () => {
  console.log(`Connected to mongo database!`)
})