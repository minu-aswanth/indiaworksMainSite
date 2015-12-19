	'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  description: String,
  subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model('Category', CategorySchema);