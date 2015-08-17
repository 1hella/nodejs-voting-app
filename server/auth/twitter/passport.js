var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var localEnv = require('../config/local.env.js');

exports.setup = function (User, config) {
  passport.use(new TwitterStrategy({
      consumerKey: localEnv.twitterAuth.consumerKey,
      consumerSecret: localEnv.twitterAuth.consumerSecret,
      callbackURL: localEnv.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({
        'twitter.id': profile.id
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          // create new user
          var newUser = new User();
          
          // set all the user data that we need
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;
          
          // Save our user into the database
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
        return done(null, user);
      });
    }
  ));
};