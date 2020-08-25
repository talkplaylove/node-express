const pool = require('../datas/pool')

exports.signin = async (email, password) => {
  let data = await pool.query(`select * from User where email = ?`, [email])
  let user = data[0]
  return user
}