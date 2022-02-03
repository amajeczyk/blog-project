let express = require('express');
let router  = express.Router();
let mysql = require('mysql');
const db = require('../dataBaseConnection');

router.get('/main', (req, res) => {

    const mysqlQuery = 'SELECT * FROM blogprojectdatabase.blogs LIMIT 5';

    db.query(mysqlQuery, (error, results, fields) => {
        if(error) {
            console.log(error);
            res.json({status : 'error'})
        }
        res.json({status : 'ok', data:results})
    })

})


module.exports = router;