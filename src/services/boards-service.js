const Board = require('../datas/model/Board')

exports.getBoards = () => {
  return new Promise((resolve, reject) => {
    const now = new Date()
    Board.find((err, docs) => {
      if (err) reject(err)
      resolve(docs)
    })
  })
}

exports.searchBoards = (keyword) => {
  return new Promise((resolve, reject) => {
    Board.find(
      {
        title: { $regex: `.*${keyword}.*` }
      },
      (err, docs) => {
        if (err) reject(err)
        resolve(docs)
      })
  })
}

exports.getBoard = (boardId) => {
  return new Promise((resolve, reject) => {
    Board.findById(boardId, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}

exports.createBoard = (body) => {
  const { title, content } = body
  return new Promise((resolve, reject) => {
    const board = new Board({
      title: title,
      content: content
    })
    board.save((err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}

exports.updateBoard = (boardId, body) => {
  const { title, content } = body
  return new Promise((resolve, reject) => {
    Board.updateOne({ _id: boardId },
      {
        $set: {
          title: title,
          content: content
        }
      },
      (err, raw) => {
        if (err) reject(err)
        resolve(raw)
      })
  })
}

exports.deleteBoard = (boardId) => {
  return new Promise((resolve, reject) => {
    Board.deleteOne({ _id: boardId }, (err, raw) => {
      if (err) reject(err)
      resolve(raw)
    })
  })
}

exports.likeBoard = (boardId) => {
  return new Promise((resolve, reject) => {
    Board.updateOne({ _id: boardId },
      {
        $inc: {
          likeCount: 1
        }
      },
      (err, raw) => {
        if (err) reject(err)
        resolve(raw)
      })
  })
}