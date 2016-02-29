'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  name: String,
  description: String
});

/**
 * Validations
 */

// Validate empty name
ServiceSchema
	.path('name')
	.validate(function (name) {
		return name.length;
	}, 'Name cannot be empty');

// Validate empty description
ServiceSchema
	.path('description')
	.validate(function (description) {
		return description.length;
	}, 'Description cannot be empty');

module.exports = mongoose.model('Service', ServiceSchema);