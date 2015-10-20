'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Service', ServiceSchema);