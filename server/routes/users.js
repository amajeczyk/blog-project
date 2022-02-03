var express = require('express');
var router = express.Router();
const db = require('../dataBaseConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//VALIDATE DATA WITH JOI package 

/* GET users listing. */
router.post('/register', async function(req, res) {
  const {username, email, textPassword} = req.body;
  
  if(!username || !email || !textPassword ){
    return res.json({status : 'error', error : "invalid data"});
  }

  if(textPassword.length < 6){
    return res.json({status : 'error', error : "Password needs to have at least 6 characters"});
  }

  //check if user exists
  try{
    const q1 = `SELECT EXISTS(SELECT * FROM blogprojectdatabase.credintials WHERE username="${username}" or email="${email}")`;
    db.query(q1, async (error, results, fields) => {
      if(error) {
          console.log('error', error);
          return res.json({status : 'error'});
      }
      userExists = Object.values(results[0]).pop();
      if(userExists){
        return res.json({status:"error", error:"User already exists"});
      }


      //Try to create user
      const hashedPassword = await bcrypt.hash(textPassword,10);
      const mysqlQuery = `INSERT INTO blogprojectdatabase.credintials (username, password, email) VALUES ("${username}", "${hashedPassword}", "${email}")`;

      try{
          db.query(mysqlQuery, (error, results, fields) => {
            if(error) {
                console.log(error);
                return res.json({status : 'error'});
            }
            return res.json({status : 'ok', message:'User created'})
          })
      }
      catch(err){
        console.log(err)
      }
  })
  }catch(err){
    console.log(err)
  }
  
});

router.post('/login', function(req, res) {
  const {username, textPassword} = req.body;
  
  const q1 = `SELECT * FROM blogprojectdatabase.credintials WHERE username="${username}"`;
  let user;

  if(textPassword.length < 6){
    return res.json({status : 'error', error : "Invalid username/password"});
  }

  try{
    db.query(q1, async (error, results, fields) => {
      if(error){
        console.log("error", error);
        return res.json({status : 'error'});
      }
      if(results.length != 1) return res.json({status : 'error', error:"Invalid username/password"});
      
      user = results.pop();
      if(await bcrypt.compare(textPassword, user.password)){
        //jwt
        const token = jwt.sign({id: user.userID, username: user.username}, process.env.TOKEN_SECRET);
        return res.json({status : 'ok', token: token, message:"Successfuly logged in"});

      }
      return res.json({status : 'error', error:"Invalid username/password"});
    })
  }
  catch(err){
    console.log('catch', err);
  }
});

router.post('/authenticate', (req, res) => {
  const {authToken} = req.body;
  console.log(authToken);
  
  if(!authToken){
    return res.json({authentication : false, message : 'Authentication failed'});
  }
  
  try{
    if(jwt.verify(authToken, process.env.TOKEN_SECRET)){
      return res.json({authentication : true, message : 'Authentication succes'});
    }
  }
  catch(err){
    console.log("Authentication error occured:", err)
  }
  res.json({authentication : false, message : 'Authentication failed'});
})

module.exports = router;
