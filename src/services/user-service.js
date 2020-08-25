const pool = require('../datas/pool')
const bcrypt = require('bcrypt')

exports.signin = async (email, password) => {
  try {
    let data = await pool.query(`select * from User where email = ?`, [email])
    let users = data[0]
    if (users.length == 0) {
      throw Error('없음')
    }

    let user = users[0]
    if (!await bcrypt.compare(password, user.password)) {
      throw Error('불일치')
    }

    return user
  } catch (err) {
    throw Error(err)
  }
}