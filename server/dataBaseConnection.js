let mysql = require('mysql');
//connect to database
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  })
  
module.exports = db
  