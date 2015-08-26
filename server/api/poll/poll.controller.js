'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function(err, polls) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    return res.json(poll);
  });
};

// Get polls by username
exports.find = function(req, res) {
  Poll.find({
    author: req.params.name
  }, function(err, polls) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(polls);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  var poll = req.body;
  poll.votes = [];
  poll.options.forEach(function() {
    // Add a vote initialized to 1 for each option
    poll.votes.push(1);
  });

  Poll.create(poll, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(poll);
  });
};

// Increment the vote number of an option of a poll
// Returns a 403 if the user already voted
exports.addVote = function(req, res) {
  var id = req.params.id;
  var optionIndex = req.params.option;
  var username = req.user.name;

  Poll.findById(id, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    if (poll.users_voted.indexOf(username) !== -1) {
      return res.status(403).send('User already cast vote');
    }
    poll.users_voted.push(username);
    poll.votes[optionIndex] = poll.votes[optionIndex] + 1;
    poll.markModified('votes');
    poll.save(function(err, newPoll) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(newPoll);
    });
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    var updated = _.extend(poll, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    poll.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
