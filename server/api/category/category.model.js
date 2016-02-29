	'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  description: String,
  subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
});

/**
 * Validations
 */

// Validate empty name
CategorySchema
	.path('name')
	.validate(function (name) {
		return name.length;
	}, 'Name cannot be empty');

// Validate empty description
CategorySchema
	.path('description')
	.validate(function (description) {
		return description.length;
	}, 'Description cannot be empty');

// Validate empty subCategories
CategorySchema
	.path('subCategories')
	.validate(function (subCategories) {
		return subCategories.length;
	}, 'Please select at least one Sub Category');

module.exports = mongoose.model('Category', CategorySchema);