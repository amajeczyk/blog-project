const jwt = require('jsonwebtoken')
const jwt_decode = require("jwt-decode");

module.exports = function jwtCheck(req, res,next){
    const {authToken} = req.body;
    console.log('middleware')
    if(!authToken){
        return res.json({authentication : false, message : 'Authentication failed'});
    }
    try{
        if(jwt.verify(authToken, process.env.TOKEN_SECRET)){
          req.body.user = jwt_decode(authToken);
          next();
          return;
        }
      }
    catch(err){
        console.log("Authentication error occured")
    }
    res.json({authentication : false, message : 'Authentication failed'});
}