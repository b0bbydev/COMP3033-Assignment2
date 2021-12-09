/*
 * Name: Bobby Jonkman - 200338513
 * Date: Dec.8.2021
 * Purpose: Assignment 2
 */

var express = require('express');
var router = express.Router();

// contact model.
const Restaurant = require('../models/restaurant');

/* GET /restaurants */
router.get('/', function (req, res, next) {
  // get contacts.
  Restaurant.find((err, restaurants) => {
    if (err) {
      console.log(err);
    } else {
      res.json(restaurants)
      console.log(req.query)
    } // end of if-else.
  })
});

/* POST /restaurants */
router.post('/', (req, res, next) => {
  // Validate required fields
  if (!req.body.name) {
    res.json({
      'ValidationError': 'The restaurant name is a required field'
    }).status(400);
  } else if (!req.body.rating) {
    res.json({
      'ValidationError': 'The restaurant rating is a required field'
    }).status(400);
  } else if (!req.body.description) {
    res.json({
      'ValidationError': 'The restaurant description is a required field'
    }).status(400);
  } else {
    Restaurant.create({
      name: req.body.name,
      rating: req.body.rating,
      description: req.body.description,
      postalcode: req.body.postalcode
    }, (err, newRestaurant) => {
      // implement error handling logic
      if (err) {
        console.log(err);
        res.json({
          'ErrorMessage': 'Server threw an exception'
        }).status(500);
      } else {
        res.json(newRestaurant).status(200);
      }
    });
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('restaurants', {
    title: 'Assignment 2c'
  });
});

module.exports = router;