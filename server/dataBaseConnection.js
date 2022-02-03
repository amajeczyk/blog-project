let mysql = require('mysql');
//connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'blogprojectdatabase'
  })
  
  db.connect((err) => {
    if(err){
        console.log('Failed to connect to database');
        return;
    }
    console.log('Successfuly connected to database');
  })

  module.exports = db