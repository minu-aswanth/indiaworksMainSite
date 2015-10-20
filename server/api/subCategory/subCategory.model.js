'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
  name: String,
  description: String,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);