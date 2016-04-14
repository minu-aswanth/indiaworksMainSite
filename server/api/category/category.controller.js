'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var Service = require('../service/service.model');

// Get list of categorys
exports.index = function(req, res) {
  Category.find(function (err, categorys) {
    if(err) { return handleError(res, err); }
    console.log(categorys);
    return res.status(200).json(categorys);
  });
};

// Get the sub-categories and sevices of a category
// Something is not correct. Server is refusing connections after this function is executed
exports.sendSubCatServices = function(req, res) {
  Category.findById(req.params.id)
  .populate('subCategories', 'name description _id services')
  .exec(function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.sendStatus(404); }
    console.log(category.subCategories);
    var populateData = {
      path: 'subCategories.services',
      model: 'Service',
      select: 'name description _id'
    };
    Service.populate(category, populateData, function (err2, populatedCategory) {
      if(err2) { return handleError(res, err2); }
      console.log(populatedCategory);
      return res.status(200).json(populatedCategory);
    });    
  });
};

// Get sub-categories of a category
exports.sendSubCats = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.sendStatus(404); }
    console.log(category);
    return res.status(200).json(category);
  })
  .populate('subCategories', 'name description _id');
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.sendStatus(404); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function (err, category) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.sendStatus(404); }
    var updated = _.extend(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.sendStatus(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.sendStatus(500).json(err);
}