'use strict';

var _ = require('lodash');
var Ticket = require('./ticket.model');

// Get list of tickets
exports.index = function(req, res) {
  var Query = Ticket.find({});
  if(req.query.category == 'true') {
    Query = Query.populate('category', 'name description _id');
  }
  if(req.query.sub_category == 'true') {
    Query = Query.populate('subCategory', 'name description _id');
  }
  if(req.query.service == 'true') {
    Query = Query.populate('service', 'name description _id');
  }

  Query.exec(function (err, tickets) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tickets);
  });

  // Ticket.find(function (err, tickets) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(200).json(tickets);
  // })
  // .populate('category', 'name description _id')
  // .populate('subCategory', 'name description _id')
  // .populate('service', 'name description _id');
};

// Get a single ticket
exports.show = function(req, res) {
  var Query = Ticket.findById(req.params.id);
  if(req.query.category == 'true') {
    Query = Query.populate('category', 'name description _id');
  }
  if(req.query.sub_category == 'true') {
    Query = Query.populate('subCategory', 'name description _id');
  }
  if(req.query.service == 'true') {
    Query = Query.populate('service', 'name description _id');
  }

  Query.exec(function (err, tickets) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tickets);
  });


  // Ticket.findById(req.params.id, function (err, ticket) {
  //   if(err) { return handleError(res, err); }
  //   if(!ticket) { return res.sendStatus(404); }
  //   return res.json(ticket);
  // })
  // .populate('category', 'name description _id')
  // .populate('subCategory', 'name description _id')
  // .populate('service', 'name description _id');
};

// Creates a new ticket in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Ticket.create(req.body, function (err, ticket) {
    if(err) { return handleError(res, err); }
    console.log(req.body);
    return res.status(201).json(ticket);
  });
};

// Updates an existing ticket in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ticket.findById(req.params.id, function (err, ticket) {
    if (err) { return handleError(res, err); }
    if(!ticket) { return res.sendStatus(404); }
    var updated = _.extend(ticket, req.body);
    updated.save(function (err) {
      console.log(updated);
      console.log(err);
      if (err) { return handleError(res, err); }
      return res.status(200).json(ticket);
    });
  });
};

// Deletes a ticket from the DB.
exports.destroy = function(req, res) {
  Ticket.findById(req.params.id, function (err, ticket) {
    if(err) { return handleError(res, err); }
    if(!ticket) { return res.sendStatus(404); }
    ticket.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}