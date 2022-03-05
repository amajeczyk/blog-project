var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const dotenv = require('dotenv')


var usersRouter = require('./routes/users');
let articelsRouter = require('./routes/articels')
let blog  = require('./routes/blog')

//initzialize configuration file
dotenv.config();

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: "https://naughty-hopper-a16c5d.netlify.app", 
  credentials: true,
}))

app.use('/users', usersRouter);
app.use('/articels', articelsRouter);
app.use('/blog', blog)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {                 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500)
});

module.exports = app;
