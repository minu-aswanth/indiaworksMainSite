'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  /*can be user*/
  bookedByUser: { type: Schema.Types.ObjectId, ref: 'User' },
  /*not needed*/
  userName: String,
  /*not needed*/
  email: String,
  /*not needed*/
  phone: String,
  /*not needed*/
  location: String,
  ticketLocation: String,
  workersAssigned: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rating: { type: Number, default: 0 },
  createdOn: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Ticket', TicketSchema);