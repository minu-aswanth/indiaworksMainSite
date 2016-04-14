'use strict';

var _ = require('lodash');
var SubCategory = require('./subCategory.model');

// Get list of subCategorys
exports.index = function(req, res) {
  // Check whether to populate services
  var service = false;
  if(req.query.service == true) {
    var service = true;
  }

  // Populate services
  if(service) {
    SubCategory.find(function (err, subCategorys) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(subCategorys);
    })
    .populate('services', 'name description _id');    
  }
  // Populate nothing
  else {
    SubCategory.find(function (err, subCategorys) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(subCategorys);
    });    
  }
};

// Get a single subCategory
exports.show = function(req, res) {
  // Check whether to populate services
  var service = false;
  if(req.query.service == true) {
    var service = true;
  }

  // Populate services
  if(service) {
    SubCategory.findById(req.params.id, function (err, subCategorys) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(subCategorys);
    })
    .populate('services', 'name description _id');    
  }
  // Populate nothing
  else {
    SubCategory.findById(req.params.id, function (err, subCategory) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(subCategorys);
    });    
  }
};

// Creates a new subCategory in the DB.
exports.create = function(req, res) {
  SubCategory.create(req.body, function (err, subCategory) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(subCategory);
  });
};

// Updates an existing subCategory in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SubCategory.findById(req.params.id, function (err, subCategory) {
    if (err) { return handleError(res, err); }
    if(!subCategory) { return res.sendStatus(404); }
    var updated = _.extend(subCategory, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(subCategory);
    });
  });
};

// Deletes a subCategory from the DB.
exports.destroy = function(req, res) {
  SubCategory.findById(req.params.id, function (err, subCategory) {
    if(err) { return handleError(res, err); }
    if(!subCategory) { return res.sendStatus(404); }
    subCategory.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}