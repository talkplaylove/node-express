const Board = require('../datas/model/Board')
const CustomError = require('../advice/custom-error')

exports.getBoards = () => {
  return new Promise((resolve, reject) => {
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
      if (!doc) reject(new CustomError(404, '게시글이 없습니다.'))
      resolve(doc)
    })
  })
}

exports.createBoard = (body) => {
  const {title, content} = body
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
  const {title, content} = body
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
        if (raw.n == 0) reject(new CustomError(404, '게시글이 없습니다.'))
        resolve(raw)
      })
  })
}

exports.deleteBoard = (boardId) => {
  return new Promise((resolve, reject) => {
    Board.deleteOne({ _id: boardId }, (err, raw) => {
      if (err) reject(err)
      if (raw.n == 0) reject(new CustomError(404, '게시글이 없습니다.'))
      resolve(raw)
    })
  })
}