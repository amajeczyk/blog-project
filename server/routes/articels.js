let express = require('express');
let router  = express.Router();
const db = require('../dataBaseConnection');
let jwtAuth = require('../controllers/jwtAuthentication')

router.get('/main', (req, res) => {

    const mysqlQuery = 'SELECT * FROM blogprojectdatabase.blogs LIMIT 5';

    db.query(mysqlQuery, (error, results, fields) => {
        if(error) {
            console.log(error);
            res.json({status : 'error'})
        }
        
        let date = new Date();

        results.forEach(element => {
            date.setTime(parseInt(element['creationDate'], 10))
            element['creationDate'] = date
        });
        res.json({status : 'ok', data:results})
    })

})

router.post('/add/blog', jwtAuth, async function(req, res){
   let validateTitle = /^[a-zA-Z0-9,#._ ]{6,80}$/i
   let validateBlogText = /^[a-zA-Z0-9,#._ ]{20,5000}$/i

   let {title, blogtext, user} = req.body;

    title.trim()
    blogtext.trim()

   console.log(title, blogtext, user);

   if(!validateTitle.test(title)){
        return res.json({status : 'error', message : 'Title must have between 6 and 80 charcters'});
   }
   if(!validateBlogText.test(blogtext)){
        return res.json({status : 'error', message : 'Text must have between 20 and 1000 charcters'});
    }   

    let date = String(Date.now());
    try {

        const mysqlQuery = `INSERT INTO blogprojectdatabase.blogs (author, title, creationDate, blogText, readCount, userID) VALUES ("${user.username}", "${title}", "${date}", "${blogtext}", "${0}", "${user.id}") `;
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
    console.log(user);
    
    try{
        const mysqlQuery = `SELECT * FROM blogprojectdatabase.blogs WHERE userID="${user.id}"`;
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

/*router.get('/get/new/blogs', function(req, res){
    const blogsalreadydisplayed =  req.headers.blogsalreadydisplayed.split(',')

    
})*/

router.delete('/delete',  jwtAuth, function(req, res){
    const {blogId, user} = req.body;
    
    try {
        const mysqlQuery = `DELETE FROM blogprojectdatabase.blogs WHERE (userID = "${user.id}" AND id = "${blogId}");`
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