const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'kotlinSpring',
  password: '1234',
  database: 'demo',
  connectionLimit: 10
})

module.exports = pool