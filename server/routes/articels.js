let express = require('express');
let router  = express.Router();
let mysql = require('mysql');

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

router.get('/main', (req, res) => {
    console.log(req.isAuthnticeted)

    const mysqlQuery = 'SELECT * FROM blogprojectdatabase.blogs LIMIT 5';

    db.query(mysqlQuery, (error, results, fields) => {
        if(error) {
            console.log(error);
            res.json({status : 'error'})
        }
        res.json({status : 'ok', data:results})
    })

    /*res.cookie("session", JSON.stringify({message:'hi'}), {
        secure:false,
        httpOnly:false,
        sameSite:false,
        path:'/main',
        expires:date
    })*/
    //res.json({status : 'ok'})

})


module.exports = router;