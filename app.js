var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
const cors = require('cors');
var connectDB = require("./db");

// const corsOptions ={
//   origin:true,
//   credentials:true,            //access-control-allow-credentials:true
//   // optionSuccessStatus:200
// }
const dotenv = require('dotenv');
dotenv.config();

connectDB();

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
app.use((req, res, next) => {
  const error = new Error(`No Found ${req.originalUrl}`)
  // res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const  error = res.statusCode === 200 ? 500 : res.statusCode
  res.status(error);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
});
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//     res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   })
//   res.render('error');
// });

module.exports = app;
