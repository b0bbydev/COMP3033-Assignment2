/*
 * Name: Bobby Jonkman - 200338513
 * Date: Dec.8.2021
 * Purpose: Assignment 2
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment 2c' });
});

module.exports = router;
