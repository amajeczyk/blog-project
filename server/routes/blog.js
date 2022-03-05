let express = require('express');
let router  = express.Router();
const db = require('../dataBaseConnection');
let jwtAuth = require('../controllers/jwtAuthentication')

router.get('/:id', function(req, res, next){
    const id = req.params.id;

    if(!/^[0-9]+$/i.test(id)){
        return res.json({status : 'error', message : 'Blog does not exists'})
    }

    const mysqlQuery = `SELECT * FROM ${process.env.HOST}.blogs WHERE id="${id}"`;

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

router.post('/upvote/:id', jwtAuth, function(req,res,next){
    const id = req.params.id;
    const {user} = req.body;

    //check if votes exists
    let mysqlQuery = `SELECT EXISTS(SELECT * FROM ${process.env.HOST}.votes WHERE (id="${id}" AND userID="${user.id}"))`;

    try{
        db.query(mysqlQuery, function(error, results, fields){
            if(error) {
                console.log('error', error);
                return res.json({status : 'error'});
            }
            voteExists = Object.values(results[0]).pop();
            if(voteExists){
              return res.json({status:"error", message:"You have already voted on this post"});
            }

            try{
                mysqlQuery = `INSERT INTO ${process.env.HOST}.votes values ("${user.id}", "${id}");`
                db.query(mysqlQuery, function(error, results, fields){
                    if(error) {
                        console.log('error', error);
                        return res.json({status : 'error'});
                    }
                    try{
                        mysqlQuery = `UPDATE ${process.env.HOST}.blogs SET readCount = readCount + 1  WHERE id="${id}"`;
                        db.query(mysqlQuery, function(error, results, fields){
                            if(error) {
                                console.log('error', error);
                                return res.json({status : 'error'});
                            }
                            return res.json({status : 'ok', message : 'Successfuly voted on blog'})
                        })
                    }
                    catch(error){
                        console.log(error);
                    }
                })
            }
            catch(error){
                console.log(error);
            }
        })

    }catch(error){
        console.log(err)
    }

})



module.exports = router;