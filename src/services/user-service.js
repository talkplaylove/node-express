const pool = require('../datas/pool')
const CustomError = require('../advice/custom-error')

const bcrypt = require('bcrypt')

exports.signin = async (email, password) => {
  const data = await pool.query(`
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
  const users = data[0]
  if (users.length == 0) {
    throw new CustomError(404, '사용자를 찾을 수 없습니다.')
  }

  let user = users[0]
  if (!bcrypt.compareSync(password, user.password)) {
    throw new CustomError(404, '패스워드가 다릅니다.')
  }

  return user
}

exports.signup = async (user) => {
  if ((await this.duplicateEmail(user.email)).duplicated)
    throw new CustomError(409, '다른 이메일을 입력해주세요.')
  if ((await this.duplicateName(user.name)).duplicated)
    throw new CustomError(409, '다른 이름을 입력해주세요.')

  const currentDate = new Date()
  const data = await pool.query(`insert into User set ?`,
    {
      name: user.name,
      password: bcrypt.hashSync(user.password, 10),
      email: user.email,
      gender: user.gender,
      createdAt: currentDate,
      updatedAt: currentDate
    }
  )
  const result = data[0]
  return {
    id: result.insertId
  }
}

exports.duplicateEmail = async (email) => {
  const data = await pool.query(`
    select count(1) as duplicated 
    from User 
    where email = ?`,
    [email]
  )
  return {
    duplicated: data[0][0].duplicated > 0 ? true : false
  }
}

exports.duplicateName = async (name) => {
  const data = await pool.query(`
    select count(1) as duplicated
    from User
    where name = ?`,
    [name]
  )
  return {
    duplicated: data[0][0].duplicated > 0 ? true : false
  }
}