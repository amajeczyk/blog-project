let express = require('express');
let router  = express.Router();
const db = require('../dataBaseConnection');

router.get('/:id', function(req, res, next){
    const id = req.params.id;

    if(!/^[0-9]+$/i.test(id)){
        return res.json({status : 'error', message : 'Blog does not exists'})
    }

    const mysqlQuery = `SELECT * FROM blogprojectdatabase.blogs WHERE id="${id}"`;

    try{
        db.query(mysqlQuery, function(error, results, fields){
            if(error){
                return res.json({status : 'error'})    
            }
            if(results.length == 0){
                return res.json({status : 'error', message : 'Blog does not exists'})
            }
            return res.json({status : 'ok', data : results})
        })
    }catch(error){
        console.log(error)
    }
})
module.exports = router;