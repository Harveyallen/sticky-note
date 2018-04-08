var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;



passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')

  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: 'dc1001f310b469326879',
    clientSecret: '9c4d0ca7fd6f590f5710b5e8a815f2233066d74c',
    callbackURL: "http://localhost:3789/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
      req.session.user = {
          uid: req.user.id,
          username: req.user.displayName || req.user.username,
          avatar: req.user._json.avatar_url,
          provider: req.user.provider
      };
      res.redirect('/');
  });



module.exports = router;
