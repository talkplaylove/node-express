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