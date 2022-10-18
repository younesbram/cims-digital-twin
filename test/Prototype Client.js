//Prototype 1 - Client for Canada.js server
//The geocoding queires will stay client side

//GETS
//Requesting places names
    //Populating the dropdown for selecting a place

//Requesting a 'place's geoJSON 
    //This function would be called when a place is selected
    //Using received data to query the map with mapbox geocodingis

//POSTS
//Sending a 'new place's data to the server
//Mapbox-viewer - line 933-946

//connecting to database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//connection url
const url = 'mongodb://localhost:3000';

//database name
const dbName = 'cimsTest';

//connecting to server
MongoClient.connect(url, funtion(err, client),{
  assert.equal(null, err);
  console.log("Successful connection to server");

  const db = client.db(dbName);

  client.close();
})