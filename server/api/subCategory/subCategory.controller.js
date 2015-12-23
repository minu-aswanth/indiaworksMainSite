'use strict';

var _ = require('lodash');
var SubCategory = require('./subCategory.model');

// Get list of subCategorys
exports.index = function(req, res) {
  SubCategory.find(function (err, subCategorys) {
    if(err) { return handleError(res, err); }
    return res.json(200, subCategorys);
  });
};

// Get a single subCategory
exports.show = function(req, res) {
  SubCategory.findById(req.params.id, function (err, subCategory) {
    if(err) { return handleError(res, err); }
    if(!subCategory) { return res.send(404); }
    return res.json(subCategory);
  });
};

// Creates a new subCategory in the DB.
exports.create = function(req, res) {
  SubCategory.create(req.body, function (err, subCategory) {
    if(err) { return handleError(res, err); }
    return res.json(201, subCategory);
  });
};

// Updates an existing subCategory in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SubCategory.findById(req.params.id, function (err, subCategory) {
    if (err) { return handleError(res, err); }
    if(!subCategory) { return res.send(404); }
    var updated = _.extend(subCategory, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, subCategory);
    });
  });
};

// Deletes a subCategory from the DB.
exports.destroy = function(req, res) {
  SubCategory.findById(req.params.id, function (err, subCategory) {
    if(err) { return handleError(res, err); }
    if(!subCategory) { return res.send(404); }
    subCategory.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}