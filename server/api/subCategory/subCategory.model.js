'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
  name: String,
  description: String,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

/**
 * Validations
 */

// Validate empty name
SubCategorySchema
	.path('name')
	.validate(function (name) {
		return name.length;
	}, 'Name cannot be empty');

// Validate empty description
SubCategorySchema
	.path('description')
	.validate(function (description) {
		return description.length;
	}, 'Description cannot be empty');

// Validate empty subCategories
SubCategorySchema
	.path('services')
	.validate(function (services) {
		return services.length;
	}, 'Please select at least one Sub Category');

module.exports = mongoose.model('SubCategory', SubCategorySchema);