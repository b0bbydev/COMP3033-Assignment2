/*
 * Name: Bobby Jonkman
 * Date: Dec.9.2021
 * Purpose: Assignment 2
 */

// mongoose
const mongoose = require('mongoose')

// create schema
var restaurantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Int,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('restaurants', restaurantsSchema)