import createError from "http-errors";

import express from "express";

import path from "path";

import cookieParser from "cookie-parser";

import logger from "morgan";
// var indexRouter = require('./routes/index');
import productsRouter from "./routes/products.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";

import cors from "cors";
import connectDB from "./db.js";

import dotenv from "dotenv";

dotenv.config();

connectDB();

var app = express();

app.use(express.json());

app.use(cors());

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);


/*Error Middleware*/
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

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
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

export default app;
