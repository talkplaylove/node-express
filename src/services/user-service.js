const pool = require('../datas/pool')
const CustomError = require('../advice/custom-error')

const bcrypt = require('bcrypt')

exports.signin = async (email, password) => {
  const fetched = await pool.query(`
    select 
      id,
      email,
      name,
      gender,
      password,
      createdAt,
      updatedAt
    from User 
    where email = ?`,
    [email]
  )
  const users = fetched[0]
  if (users.length == 0) {
    throw new CustomError(404, '사용자를 찾을 수 없습니다.')
  }

  let user = users[0]
  if (!bcrypt.compareSync(password, user.password)) {
    throw new CustomError(404, '패스워드가 다릅니다.')
  }

  return user
}

exports.signup = async (body) => {
  await this.duplicateEmail(body.email)
  await this.duplicateName(body.name)

  const currentDate = new Date()
  const inserted = await pool.query(`insert into User set ?`,
    {
      name: body.name,
      password: bcrypt.hashSync(body.password, 10),
      email: body.email,
      gender: body.gender,
      createdAt: currentDate,
      updatedAt: currentDate
    }
  )
  const result = inserted[0]
  return {
    id: result.insertId
  }
}

exports.duplicateEmail = async (email) => {
  const fetched = await pool.query(`
    select count(1) as duplicated 
    from User 
    where email = ?`,
    [email]
  )

  if (fetched[0][0].duplicated > 0) {
    throw new CustomError(409, '다른 이메일을 입력해주세요.')
  }
}

exports.duplicateName = async (name) => {
  const fetched = await pool.query(`
    select count(1) as duplicated
    from User
    where name = ?`,
    [name]
  )

  if (fetched[0][0].duplicated > 0) {
    throw new CustomError(409, '다른 이름을 입력해주세요.')
  }
}