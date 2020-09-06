const pool = require('../datas/pool')
const CustomError = require('../advice/custom-error')

exports.getBoard = async (boardId) => {
  const fetched = await pool.query(`
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
  const boards = fetched[0]
  if (boards.length == 0) {
    throw new CustomError(404, '게시글을 찾을 수 없습니다.')
  }

  return boards[0]
}

exports.getBoards = async (page, size) => {
  const fetched = await pool.query(`
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

  const boards = fetched[0]
  return boards
}

exports.createBoard = async (body, session) => {
  if (!session.userId) throw new CustomError(401, '사용자 인증이 필요합니다.')

  const currentDate = new Date()
  const inserted = await pool.query(`insert into Board set ?`,
    {
      title: body.title,
      content: body.content,
      userId: session.userId,
      hitCount: 0,
      deleted: 0,
      createdAt: currentDate,
      updatedAt: currentDate
    }
  )
  const result = inserted[0]
  return {
    id: result.insertId
  }
}

exports.updateBoard = async (boardId, body, session) => {
  if (!session.userId) throw new CustomError(401, '사용자 인증이 필요합니다.')

  const board = await this.getBoard(boardId)
  if (board.userId !== session.userId) throw new CustomError(403, '권한이 없습니다.')

  const currentDate = new Date()
  const updated = await pool.query(`update Board set ? where id = ?`,
    [
      {
        title: body.title,
        content: body.content,
        updatedAt: currentDate
      },
      boardId
    ]
  )

  const result = updated[0]
  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  }
}

exports.deleteBoard = async (boardId, session) => {
  if (!session.userId) throw new CustomError(401, '사용자 인증이 필요합니다.')

  const board = await this.getBoard(boardId)
  if (board.userId !== session.userId) throw new CustomError(403, '권한이 없습니다.')

  const currentDate = new Date()
  const deleted = await pool.query(`update Board set ? where id = ?`,
    [
      {
        deleted: 1,
        updatedAt: currentDate
      },
      boardId
    ]
  )

  const result = deleted[0]
  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  }
}

exports.hitBoard = async (boardId, ip) => {
  const date = new Date().toISOString().split('T')[0]
  const fetched = await pool.query(`
    select
      boardId,
      date,
      ip
    from
      BoardHit
    where
      boardId = ?
      and date = ?
      and ip = ?
    `,
    [boardId, date, ip]
  )
  const hits = fetched[0]
  if (hits.length == 0) {
    pool.query(`insert into BoardHit set ?`,
      {
        boardId: boardId,
        date: date,
        ip: ip
      }
    )
  }
}