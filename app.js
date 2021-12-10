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

// passport - for securing the API.
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

// include mongoose.
const mongoose = require('mongoose');

// create routers here.
var indexRouter = require('./routes/index');
var restaurantsRouter = require('./routes/restaurants');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport.
app.use(passport.initialize())

// implement basic authentication strategy.
passport.use(new BasicStrategy((username, password, done) => {
  // add logic to authenticate against provided username & password.
  // credentials come from the request as a header in format: username:password
  // hard coded username & pass.
  if(username == 'test' && password == 'tester')
  {
    console.log(`User ${username} authenticated!`)
    return done(null, username)
  } else {
    console.log(`Authentication failed for user ${username}`)
    return done(null, false)
  }// end of if-else.
}));

// use routers here.
app.use('/', indexRouter);
// lock this endpoint behind authentication by including passport.authenticate()
app.use('/restaurants', passport.authenticate('basic', { session: false }), restaurantsRouter);

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
