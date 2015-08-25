/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
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

Thing.find({}).remove(function() {
  Thing.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
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
