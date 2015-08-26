'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  author: String,
  options: [String],
  votes: [Number],
  users_voted: [String],
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', PollSchema);
