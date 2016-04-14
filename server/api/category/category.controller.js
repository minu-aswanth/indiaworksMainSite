'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var Service = require('../service/service.model');

// Get list of categorys
exports.index = function(req, res) {
  // Check whether to populate subCategories and services
  var sub_category = false;
  var service = false;
  if(req.query.sub_category == true) {
    var sub_category = true;
  }
  if(req.query.service == true) {
    var service = true;
  }

  // Populate both subCategories and services 
  if(sub_category && service) {
    Category.find({})
      .populate('subCategories', 'name description _id services')
      .exec(function (err, categorys) {
        if(err) { return handleError(res, err); }
        if(!categorys) { return res.sendStatus(404); }
        var populateData = {
          path: 'subCategories.services',
          model: 'Service',
          select: 'name description _id'
        };
        Service.populate(categorys, populateData, function (err2, populatedCategorys) {
          if(err2) { return handleError(res, err2); }
          console.log(populatedCategorys);
          return res.status(200).json(populatedCategorys);
        });    
      });
  }
  // Populate only subCategories
  else if(sub_category && !service) {
    Category.find(function (err, categorys) {
      if(err) { return handleError(res, err); }
      if(!categorys) { return res.sendStatus(404); }
      return res.status(200).json(categorys);
    })
    .populate('subCategories', 'name description _id');
  }
  // Populate nothing
  else {
    Category.find(function (err, categorys) {
      if(err) { return handleError(res, err); }
      console.log(categorys);
      return res.status(200).json(categorys);
    });    
  }
};

// Get a single category
exports.show = function(req, res) {
  // Check whether to populate subCategories and services
  var sub_categories = false;
  var services = false;
  if(req.query.sub_categories == true) {
    var sub_categories = true;
  }
  if(req.query.services == true) {
    var services = true;
  }

  // Populate both subCategories and services 
  if(sub_categories && services) {
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
  } 
  // Populate only subCategories
  else if (sub_categories && !services) {
    Category.findById(req.params.id, function (err, category) {
      if(err) { return handleError(res, err); }
      if(!category) { return res.sendStatus(404); }
      console.log(category);
      return res.status(200).json(category);
    })
    .populate('subCategories', 'name description _id');
  } 
  // Populate nothing
  else {
    Category.findById(req.params.id, function (err, category) {
      if(err) { return handleError(res, err); }
      if(!category) { return res.sendStatus(404); }
      return res.json(category);
    });    
  }
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
  return res.status(500).json(err);
}