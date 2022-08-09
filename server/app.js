/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Connect to MongoDB
var clientPromise = mongoose.connect(config.mongo.uri, config.mongo.options).then(function(m) {
  return m.connection.getClient();
});

mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);

// Persist sessions with mongoStore
// We need to enable sessions for passport twitter because its an oauth 1.0 strategy
app.use(session({
  secret: config.secrets.session,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    clientPromise: clientPromise,
    dbName: mongoose.connection.dbName
  })
}));

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
