/*
 * Name: Bobby Jonkman
 * Date: Dec.9.2021
 * Purpose: Assignment 2
 */

// mongoose
const mongoose = require('mongoose')

// create schema
var restaurantsSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    restaurantRating: {
        type: Int,
        required: true
    },
    restaurantDescription: String
})

module.exports = mongoose.model('restaurants', restaurantsSchema)