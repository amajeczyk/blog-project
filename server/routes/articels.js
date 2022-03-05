let express = require('express');
let router  = express.Router();
const db = require('../dataBaseConnection');
let jwtAuth = require('../controllers/jwtAuthentication')

router.get('/main', (req, res) => {

    const mysqlQuery = `SELECT userID, id, title, creationDate, blogText, readCount, username FROM ${process.env.HOST}.blogs natural join ${process.env.HOST}.credintials ORDER BY RAND() LIMIT 5;`

    db.query(mysqlQuery, (error, results, fields) => {
        if(error) {
            console.log(error);
            return res.json({status : 'error'})
        }
        
        return res.json({status : 'ok', data:results})
    })

})

router.post('/add/blog', jwtAuth, async function(req, res){
   let validateTitle = /^[a-zA-Z0-9,#._ ]{6,80}$/i
   let validateBlogText = /^[a-zA-Z0-9,#._, ]{20,5000}$/i

   let {title, blogtext, user} = req.body;

    title.trim()
    blogtext.trim()

   if(!validateTitle.test(title)){
        return res.json({status : 'error', message : 'Title must have between 6 and 80 charcters'});
   }
   if(!validateBlogText.test(blogtext)){
        return res.json({status : 'error', message : 'Text must have between 20 and 5000 charcters'});
    }   

    let date = String(Date.now());
    try {

        const mysqlQuery = `INSERT INTO ${process.env.HOST}.blogs (title, creationDate, blogText, readCount, userID) VALUES ("${title}", "${date}", "${blogtext}", "${0}", "${user.id}") `;
        db.query(mysqlQuery, (error, results, fields) => {
            if(error) {
                console.log(error);
                return res.json({status : 'error'})
            }
            return res.json({status : 'ok', message : 'Blog added'});
        })
    }
    catch(error){
        console.log(error);
        return res.json({status : 'error'});
    }
})

router.get('/get/user/blogs', jwtAuth, function(req, res, next){
    const {user} = req.body;
    
    try{
        const mysqlQuery = `SELECT * FROM ${process.env.HOST}.blogs WHERE userID="${user.id}"`;
        db.query(mysqlQuery, function(error, results, fields){
            if(error){
                console.log(error);
                return res.json({status : 'error'})
            }
            let date = new Date();

            results.forEach(element => {
                date.setTime(parseInt(element['creationDate'], 10))
                element['creationDate'] = date
            });
            return res.json({status : 'ok', data:results})
        })
    }
    catch(error){
        console.log(error);
    }
})

router.get('/get/new/blogs', function(req, res){
    const blogsalreadydisplayed =  req.headers.blogsalreadydisplayed.split(',')

    let conditional = blogsalreadydisplayed.reduce((previousValue, currentValue, currentIndex) => { 
        if(currentIndex == blogsalreadydisplayed.length - 1){
            return previousValue + `id != '${currentValue}'`;
        }
        return previousValue + `id != '${currentValue}' and `;
    
    }, ``)
    
    conditional.slice(0, -4);

    let mysqlQuery = `SELECT userID, id, title, creationDate, blogText, readCount, username FROM ${process.env.HOST}.blogs 
    natural join ${process.env.HOST}.credintials where (${conditional}) ORDER BY RAND() LIMIT 5;`

    try{
        db.query(mysqlQuery, function(error, results, fields){
            if(error){
                console.log(error);
                return res.json({status : 'error'})
            }
            return res.json({status : 'ok', data : results});
        })
    }
    catch(error){
        console.log(error);
    }
})

router.delete('/delete',  jwtAuth, function(req, res){
    const {blogId, user} = req.body;
    
    try {
        const mysqlQuery = `DELETE FROM ${process.env.HOST}.blogs WHERE (userID = "${user.id}" AND id = "${blogId}");`
        db.query(mysqlQuery, function(error, results, fields){
            if(error){
                return res.json({status : 'error', message : 'error occured'});
            }
            if(results.affectedRows == 0){
                return res.json({status : 'error', message : 'this blog does not exists'})
            }
            return res.json({status : 'ok', message : 'Blog deleted', blogId : blogId});
        })
    }
    catch(error){
        return res.json({status : 'error', message : 'error occured'});
    }
})


module.exports = router;