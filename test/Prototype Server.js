//Prototype 1 - Database server for Canada.js
//This prototype uses Node.js and Express.js

//Setting the server

const fs = require("fs"); // allows us to work with filesystem

//Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //parses body of request when using POST request 

//mongoDB
const mongo = require('mongodb');

use <Canada> //Create if it doesn't exist, Open if it does - Database

////statically inserting Canada.js data inside Canada db, collections - Province, City, Place, Object
/*
db.province.insertMany({
    name: "Alberta",
    code: 48,
    term: "AB",
    concise: "PROV",
    coordinates: {
        lat: 55,
        lng: -115,
    },

    name: "British Columbia",
    code: 59,
    term: "BC",
    concise: "PROV",
    coordinates: {
        lat: 53.726669,
        lng: -127.647621,
    },

    name: "Manitoba",
    code: 46,
    term: "MB",
    concise: "PROV",
    coordinates: {
      lat: 56.415211,
      lng: -98.739075,
    },

    name: "New Brunswick",
    code: 13,
    term: "NB",
    concise: "PROV",
    coordinates: {
      lat: 46.49839,
      lng: -66.159668,
    },

    name: "Newfoundland and Labrador",
    code: 10,
    term: "NL",
    concise: "PROV",
    coordinates: {
      lat: 53.135509,
      lng: -57.660435,
    },

    name: "Nova Scotia",
    code: 12,
    term: "NS",
    concise: "PROV",
    coordinates: {
      lat: 45,
      lng: -63,
    },

    name: "Ontario",
    code: 35,
    term: "ON",
    concise: "PROV",
    coordinates: {
      lat: 47.75,
      lng: -84.83333,
    },

    name: "Prince Edward Island",
    code: 11,
    term: "PE",
    concise: "PROV",
    coordinates: {
      lat: 46.25,
      lng: -63,
    },

    name: "Quebec",
    code: 24,
    term: "QC",
    concise: "PROV",
    coordinates: {
      lat: 52.9399,
      lng: -73.5491,
    },

    name: "Saskatchewan",
    code: 47,
    term: "SK",
    concise: "PROV",
    coordinates: {
      lat: 55,
      lng: -106,
    },

    name: "Northwest Territories",
    code: 61,
    term: "NT",
    concise: "TERR",
    coordinates: {
      lat: 64.26667,
      lng: -119.18333,
    },

    name: "Nunavut",
    code: 62,
    term: "NU",
    concise: "TERR",
    coordinates: {
      lat: 64.15,
      lng: -95.5,
    },

    name: "Yukon",
    code: 60,
    term: "YU",
    concise: "TERR",
    coordinates: {
      lat: 63.63333,
      lng: -135.76666,
    },
})

db.city.insertMany({
    name: "Ottawa",
    province: "ON",
    layers: {
        busStops: setLayer(
          "busStops",
          "OCTranspo bus stops",
          "assets/ON/Ottawa/json/ON-Ottawa-busStops.json",
          "#CE343B",
          ocTranspo
        ),
        trees: setLayer(
          "trees",
          "Ottawa trees",
          "assets/ON/Ottawa/json/ON-Ottawa-trees.json",
          "green",
          ottawaTrees
        ),
    },
})
*/

db.place.insertMany({
    name: "Carleton University",
    id: "CDC",
    coordinates: {                
        lat: 45.38435,
        lng: -75.69435,
        msl: 80,
        zoom: 15
    } ,
    gltfPath: "assets/ON/Ottawa/CDC/glb/ON_Ottawa_CDC_",
    gltfMasses: "assets/ON/Ottawa/CDC/glb/ON-Ottawa-cu-masses.glb",
    context: {},
    ifcPath: "assets/ON/Ottawa/CDC/ifc/",
    jsonPropertiesPath: "assets/ON/Ottawa/CDC/json/ON_Ottawa_CDC_",
    placeGeojson: {},
})

//I think calling the buildings 'Object' can be problematic - Since 'Object' is a structure already it can make conversations confusing
db.objects.insertMany()

////setting some recurring variables that will be called by the client
let all_provinces_name = db.province.find({}, {name:1})
let all_cities_name = db.province.find({}, {name:1})
let all_places_name = db.province.find({}, {name:1})
let all_object_name = db.province.find({}, {name:1})

//GETS - information requested by the client

////for dropdowns

////for map movements

//POSTs - information sent by the client

////creating a place

//Closing Database