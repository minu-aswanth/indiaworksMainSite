'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkerSchema = new Schema({
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  subCategory: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
  skill: [String],
  address: String,
  phone: String,
  email: String,
  name: String,
  rating: int,
  pictureId: [String],
  documentId: [String]
});

module.exports = mongoose.model('Worker', WorkerSchema);