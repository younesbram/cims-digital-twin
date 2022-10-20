# CIMS - Digital Twin

clone to local folder,

in terminal : `npm install`

then: `npm start`

this will run it in NODE_ENV production mode. uses express compression middleware, and express auth0 openid-connect.
runs on nodemon (for better versioning and development)

join localhost:3000
view website normally.

join localhost:3000/logintest

will be redirected to login -> redirected to /loginstatus

join localhost:3000/profile to see the profile

join localhost:3000/logout to logout

join localhost:3000/login to manually login
