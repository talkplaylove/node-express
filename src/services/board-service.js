const pool = require('../datas/pool')
const CustomError = require('../advice/custom-error')

exports.getBoard = async (boardId) => {
  const data = await pool.query(`
    select
      id,
      title,
      content,
      userId,
      hitCount,
      createdAt,
      updatedAt
    from Board
    where id = ?
      and deleted = 0`,
    [boardId]
  )
  const boards = data[0]
  if (boards.length == 0) {
    throw new CustomError(404, '게시글을 찾을 수 없습니다.')
  }

  return boards[0]
}

exports.getBoards = async (page, size) => {
  const data = await pool.query(`
    select
      id,
      title,
      userId,
      hitCount,
      createdAt,
      updatedAt
    from Board
    where deleted = 0
    order by id desc
    limit ?, ?`,
    [page, size]
  )

  const boards = data[0]
  return boards
}

exports.createBoard = async (board, userId) => {
  if (!userId) throw new CustomError(401, '사용자 인증이 필요합니다.')

  const currentDate = new Date()
  const data = await pool.query(`insert into Board set ?`,
    {
      title: board.title,
      content: board.content,
      userId: userId,
      hitCount: 0,
      deleted: 0,
      createdAt: currentDate,
      updatedAt: currentDate
    }
  )
  const result = data[0]
  return {
    id: result.insertId
  }
}

exports.updateBoard = async (board, userId) => {
  if (!userId) throw new CustomError(401, '사용자 인증이 필요합니다.')

  const currentDate = new Date()
  const data = await pool.query(`update Board set ? where id = ?`,
    [
      {
        title: board.title,
        content: board.content,
        updatedAt: currentDate
      },
      board.id
    ]
  )

  const result = data[0]
  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  }
}