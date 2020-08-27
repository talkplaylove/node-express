const pool = require('../datas/pool')
const bcrypt = require('bcrypt')
const CustomError = require('../advice/custom-error')

exports.signin = async (email, password) => {
  const data = await pool.query(`select * from User where email = ?`, [email])
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
  const currentDate = new Date()
  const data = await pool.query(`insert into User set ?`, {
    name: user.name,
    password: bcrypt.hashSync(user.password, 10),
    email: user.email,
    gender: user.gender,
    createdAt: currentDate,
    updatedAt: currentDate
  })
  return data[0]
}