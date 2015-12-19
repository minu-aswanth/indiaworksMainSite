'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  /*can be user*/
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  /*not needed*/
  userName: String,
  /*not needed*/
  email: String,
  /*not needed*/
  phone: String,
  /*not needed*/
  location: String,
  ticketLocation: String,
  workerAssigned: { type: Schema.Types.ObjectId, ref: 'Worker' },
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Ticket', TicketSchema);