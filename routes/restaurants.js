/*
 * Name: Bobby Jonkman - 200338513
 * Date: Dec.8.2021
 * Purpose: Assignment 2
 */

var express = require('express');
var router = express.Router();

// contact model.
const Restaurant = require('../models/restaurant');

// specify a default number of records to display at once.
const pageSize = 10

/* GET /restaurants */
router.get('/', function (req, res, next) {

  /* pagination. */
  let page = req.query.page || 1

  // calculate how many records to skip. ex: 1 to 10 = skip 0, 11 to 20 = skip 10 etc..
  let skipSize = pageSize * (page - 1)

  /* implement some filtering. */
  // create query object.
  let query = {}

  // validate wether params are included in req and add them to query object.
  if(req.query.name)
  {
    query.name = req.query.name
  }
  if(req.query.rating)
  {
    query.rating = req.query.rating
  }
  if(req.query.postalcode)
  {
    query.postalcode = req.query.postalcode
  }
  
  /* now implement the above in the .find() */

  // get contacts.
  Restaurant.find(query, (err, restaurants) => {
    if (err) {
      console.log(err);
    } else {
      res.json(restaurants)
      console.log(req.query)
    } // end of if-else.
  })
  // implement pagination.
  // sort by name, jump to nth position, then take x number of records.
  .sort({name: 1})
  .skip(skipSize)
  .limit(pageSize)
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

// PUT /restaurants/:_id
router.put('/:_id', (req, res, next) => {
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
    Restaurant.findOneAndUpdate({
        _id: req.params._id
      }, // filter query
      {
        name: req.body.name,
        rating: req.body.rating,
        description: req.body.description,
        postalcode: req.body.postalcode
      }, // update document
      (err, updatedRestaurant) => {
        if (err) {
          console.log(err);
          res.json({
            'ErrorMessage': 'Server threw an exception'
          }).status(500);
        } else {
          res.json(updatedRestaurant).status(200);
        }
      } // update callback.
    );
  }
});

// DELETE /restaurants/:_id
router.delete('/:_id', (req, res, next) => {
  Restaurant.remove({
    _id: req.params._id
  }, (err) => {
    if (err) {
      console.log(err);
      res.json({
        'ErrorMessage': 'Server threw an exception'
      }).status(500);
    } else {
      res.json({
        'success': 'true'
      }).status(200);
    }
  });
});


module.exports = router;