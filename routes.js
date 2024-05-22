const express = require('express');
const passport = require('./passport'); // Ensure your passport configuration is correctly required
const router = express.Router();
const path = require('path');

// SAML login route
router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  (req, res) => {
    res.redirect('/');
  });

// SAML login callback route
router.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    // Redirect to website.html on successful login
    res.redirect('/website');
  }
);

// Register route
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html')); // Ensure this file exists
});

// Route for website.html
router.get('/website', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'website.html')); // Ensure this file exists
});

// Catch-all route to serve the index.html for AngularJS app
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
