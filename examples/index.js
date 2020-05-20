const express = require('express');
const dotenv = require('dotenv').config();
const InstagramAuth = require('../lib').InstagramAuth;

const app = express()
const port = 3000;

const ig = InstagramAuth.getInstance({
    ClientID: process.env.IG_APP_ID || "",
    ClientSecret: process.env.IG_CLIENT_SECRET || "",
    RedirectUri: process.env.IG_REDIRECT_URI || "",
    Scope: ['user_profile', 'user_media'],
});

// Redirect /register to the instagram authentication 
// window - built by Instagram API.
app.get('/register', (req, res) => {
    res.redirect(ig.constructAccessTokenUrl());
});

// Get the Authorization Code when Instagram API
// redirects to your Authorisation endpoint.
app.get('/auth/code', (req, res) => {
    let code = req.query.code;
    res.redirect(ig.constructAccessTokenUrl(code));
});

// Get the Access Token when Instagram API
// redirects to your Authorisation endpoint.
app.get('/auth/token', (req, res) => {
    let code = req.params['access_token'];
    ig.authorise(access_token);
});

app.listen(port, () => {
    console.log("Running on port " + port);
});
