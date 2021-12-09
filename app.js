/*
 * Name: Bobby Jonkman - 200338513
 * Date: Dec.8.2021
 * Purpose: Assignment 2
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// config file.
const config = require('./config/config')

// include mongoose.
const mongoose = require('mongoose');

// create routers here.
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers here.
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// connect to collection.
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message) => {
  console.log('Connected successfully!');
})
.catch((error) => {
  console.log(`Error while connecting! ${reason}`);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
