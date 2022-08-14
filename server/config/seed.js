/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

Poll.find({}).remove(function() {
  Poll.create({
    name: 'What is your favourite brand of soda?',
    author: 'Stephen Wanhella',
    options: ['Coca-Cola', 'Pepsi', 'Dr. Pepper'],
    votes: [5, 4, 7]
  }, {
    name: 'How many hours sleep do you average each night?',
    author: 'Admin',
    options: ['<5', '5', '6', '7', '8', '9', '>9'],
    votes: [1, 2, 3, 4, 4, 3, 1]
  }, {
    name: 'What is your favourite programming language?',
    author: 'Eric',
    options: ['C/C++', 'Python', 'Ruby', 'JavaScript', 'Java', 'Objective-C'],
    votes: [3, 6, 4, 7, 1, 2]
  }, function() {
    console.log('finished populating polls');
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});
