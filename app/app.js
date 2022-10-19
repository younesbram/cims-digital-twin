const express = require('express')
const { auth, requiresAuth } = require('express-openid-connect');
const app = express()

//config to be used for auth0, connecting to OAuth
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: '8sQSVmf1rw6k6Wggvkl3k9TiCyIFJ6bq',
  issuerBaseURL: 'https://younescimstest.us.auth0.com',
  secret: 'uhpZTh-luWP16Bn98hoawasLsXtYRRisoc21ROEpB0vndgZlNQ_vKJ3OB5cwfp9j',
};
const compression = require("compression");
const port = 3000
const path = require('path');
let reqpath = path.join(__dirname, "../"); //using static
app.use(express.static(reqpath));
app.use(compression()); // Compress all HTTP routes for speedy responses
app.use(auth(config));


app.get('/loginstatus', requiresAuth(), (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/logintest', (req, res) => {
  res.oidc.login({
    returnTo: 
    '/loginstatus',
    })

})

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(port, () => {
  console.log(`CDT app listening on port ${port}`)
})