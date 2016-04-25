var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // If user is logged in when request is processed
      if(req.user) {
        console.log(req.user);
        User.findById(req.user._id)
          .catch(done)
          .then(function (user) {
            if(!user) return done();

            user.providers.google = true;
            user.google = profile._json;
            return user.save()
              .catch(done)
              .then(savedUser => done(null, savedUser));
            });      
      } else {
        User.findOne({
          $or: [ {'google.id': profile.id}, {'email': profile.emails[0].value} ]
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
              provider: 'google',
              providers: { local: false, facebook: false, google: true },
              google: profile._json
            });
            user.providerStack.push('google');

            user.save(function (err) {
              if (err) done(err);
              return done(err, user);
            });
          } else {
            user.providerStack.push('google');
            user.providers.google = true;
            user.google = profile._json;

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
