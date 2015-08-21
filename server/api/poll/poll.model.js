'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  author: String,
  options: [{
    name: String,
    votes: [{
      by: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  date_added: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', PollSchema);
