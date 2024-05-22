const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');
const routes = require('./backend/routes');
const port = 9992;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Load the Okta SAML metadata XML
const samlMetadata = fs.readFileSync('path/to/okta-metadata.xml', 'utf-8'); // Adjust the path as necessary

// Passport SAML configuration
passport.use(new SamlStrategy(
  {
    path: '/login/callback',
    entryPoint: 'https://dev-55143921.okta.com/app/dev-55143921_saml20_1/exkh8tddd5Y6qJ3HT5d7/sso/saml',
    issuer: 'http://www.okta.com/exkh8tddd5Y6qJ3HT5d7',
    cert: fs.readFileSync('/Users/adityachaturvedi/Desktop/aditya/project/example-copy/okta.cert', 'utf8'),
  },
  (profile, done) => {
    // Here you would find or create the user in your database
    // For simplicity, we will just return the profile
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', passport.authenticate('saml', {
  successRedirect: '/website.html',
  failureRedirect: '/login',
}));

app.post('/login/callback',
  passport.authenticate('saml', {
    failureRedirect: '/',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/website.html');
  }
);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Protecting routes using Passport SAML
app.use('/secure', (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}, routes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
