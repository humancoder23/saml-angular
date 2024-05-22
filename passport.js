const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');

passport.use(new SamlStrategy({
  path: '/login/callback',
    entryPoint: 'https://dev-55143921.okta.com/app/dev-55143921_saml20_1/exkh8tddd5Y6qJ3HT5d7/sso/saml',
    issuer: 'http://www.okta.com/exkh8tddd5Y6qJ3HT5d7',
  cert: fs.readFileSync('/Users/adityachaturvedi/Desktop/aditya/project/example/okta.cert', 'utf8'),
}, (profile, done) => {
  console.log('SAML Profile:', profile);
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
