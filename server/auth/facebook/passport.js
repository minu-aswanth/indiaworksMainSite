var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'emails', 'displayName'],
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // If user is logged in when request is processed
      if(req.user) {
        User.findById(req.user._id)
          .catch(done)
          .then(function (user) {
            if(!user) return done();

            user.providers.facebook = true;
            user.facebook = profile._json;
            return user.save()
              .catch(done)
              .then(savedUser => done(null, savedUser));
            });
      } else {
        User.findOne({
          $or: [ {'facebook.id': profile.id}, {'email': profile.emails[0].value} ]
        }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              username: profile.username,
              provider: 'facebook',
              providers: { local: false, facebook: true, google: false },
              facebook: profile._json
            });
            user.providerStack.push('facebook');
            
            user.save(function (err) {
              if (err) done(err);
              return done(err, user);
            });
          } else {
            user.providerStack.push('facebook');
            user.providers.facebook = true;
            user.facebook = profile._json;

            // have to mark 'providers' object as modified
            user.markModified('providers');
            user.save(function (err) {
              if (err) done(err);
              return done(err, user);
            });
          }
        });
      }
    }
  ));
};