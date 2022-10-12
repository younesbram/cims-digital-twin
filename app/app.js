const express = require('express')
const { auth, requiresAuth } = require('express-openid-connect');
const app = express()

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: '8sQSVmf1rw6k6Wggvkl3k9TiCyIFJ6bq',
  issuerBaseURL: 'https://younescimstest.us.auth0.com',
  secret: 'uhpZTh-luWP16Bn98hoawasLsXtYRRisoc21ROEpB0vndgZlNQ_vKJ3OB5cwfp9j'
};
const compression = require("compression");
const port = 3000
const path = require('path');
let reqpath = path.join(__dirname, "../");
app.use(express.static(reqpath));
app.use(compression()); // Compress all HTTP routes for speedy responses
app.use(auth(config));

app.get('/', (req, res) => {
  res.sendFile('index.html', reqpath);
})


app.get('/ret', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})