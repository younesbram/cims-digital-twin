//Prototype 1 - Database server for Canada.js
//This prototype uses Node.js and Express.js

//Setting the server

const fs = require("fs"); // allows us to work with filesystem

//Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //parses body of request when using POST request 
//mongoDB
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
//pug
const pug = require('pug');

app.listen(3000);

//use <cimsTest> //Create if it doesn't exist, Open if it does - Database

//connecting to database
MongoClient.connect('mongodb://localhost:3000/cimsTest', function(err, db) {
   // useNewUrlParser: true
    if (err) throw err;
    console.log("Database 'cimsTest' created")
    console.log(db.db)

    db.close();
});

app.route(["/"])
    .get((req, res) => {
        res.status(200);
        res.setDefaultEncoding("Content-Type","text/html");
        res.send(pug.renderFile("/Testindex.pug", ))
    });

////statically inserting Canada.js data inside Canada db, collections - Province, City, Place, Object
//TEST new branch

/*db.place.insertMany({
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
    placeGeojson: {
      "type": "FeatureCollection",
      "features": [
          {
              "id": "19dc5ef9a24233ad4afb7d1302c22fdd",
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "coordinates": [
                      [
                          [
                              -75.70130847450181,
                              45.37885250495145
                          ],
                          [
                              -75.70137939763889,
                              45.37980901336084
                          ],
                          [
                              -75.70135583631776,
                              45.38030630124288
                          ],
                          [
                              -75.70121704393954,
                              45.38090837256641
                          ],
                          [
                              -75.70099854247466,
                              45.381450056900064
                          ],
                          [
                              -75.70060484922253,
                              45.38211641055423
                          ],
                          [
                              -75.70008737069259,
                              45.382740714944276
                          ],
                          [
                              -75.69969929631793,
                              45.383175040095466
                          ],
                          [
                              -75.69929194863562,
                              45.38371277931921
                          ],
                          [
                              -75.69907805981924,
                              45.38429189332331
                          ],
                          [
                              -75.69904478398492,
                              45.38497602583672
                          ],
                          [
                              -75.69909336044309,
                              45.38548029251106
                          ],
                          [
                              -75.6994998225633,
                              45.38680240419842
                          ],
                          [
                              -75.70011820026312,
                              45.38878531622905
                          ],
                          [
                              -75.7002494447103,
                              45.38930514072814
                          ],
                          [
                              -75.70027488697272,
                              45.389913266598825
                          ],
                          [
                              -75.70020978237254,
                              45.390320257103326
                          ],
                          [
                              -75.69991595080752,
                              45.39103030132526
                          ],
                          [
                              -75.69928511310589,
                              45.39176861547989
                          ],
                          [
                              -75.69745214270708,
                              45.39302028113309
                          ],
                          [
                              -75.69715753292641,
                              45.3928071905959
                          ],
                          [
                              -75.69697423870397,
                              45.392731520039945
                          ],
                          [
                              -75.69666199972447,
                              45.39271181280864
                          ],
                          [
                              -75.69610568392059,
                              45.39269918139857
                          ],
                          [
                              -75.69594219066164,
                              45.39261117859749
                          ],
                          [
                              -75.69585120968469,
                              45.3924036810036
                          ],
                          [
                              -75.69461507875333,
                              45.39066590208398
                          ],
                          [
                              -75.6945059837744,
                              45.390383927163384
                          ],
                          [
                              -75.6941746011501,
                              45.39000217643874
                          ],
                          [
                              -75.69394714656697,
                              45.38970033356594
                          ],
                          [
                              -75.6938289521502,
                              45.38966713194219
                          ],
                          [
                              -75.69341664964327,
                              45.389191421075566
                          ],
                          [
                              -75.69146908788343,
                              45.38660483584843
                          ],
                          [
                              -75.69078456297177,
                              45.385769988059224
                          ],
                          [
                              -75.68970345999874,
                              45.384380532804244
                          ],
                          [
                              -75.68921669174163,
                              45.38364185916316
                          ],
                          [
                              -75.69052848069794,
                              45.38338634467138
                          ],
                          [
                              -75.69168681496268,
                              45.38313720286405
                          ],
                          [
                              -75.69237930149794,
                              45.383126369212846
                          ],
                          [
                              -75.69314049029308,
                              45.38278895973005
                          ],
                          [
                              -75.69426419539025,
                              45.38240829319673
                          ],
                          [
                              -75.69534383363259,
                              45.382040244235895
                          ],
                          [
                              -75.69707765965103,
                              45.38146712807199
                          ],
                          [
                              -75.69828190237799,
                              45.38057272292363
                          ],
                          [
                              -75.69984594718966,
                              45.37931447009083
                          ],
                          [
                              -75.70028173459652,
                              45.37886926361392
                          ],
                          [
                              -75.70130847450181,
                              45.37885250495145
                          ]
                      ]
                  ],
                  "type": "Polygon"
              }
          }
      ]
  },
})*/

//GETS - information requested by the client
  //Client is Requesting places names
  //Client is Requesting a 'place's geoJSON 

//POSTs - information sent by the client
  //Client is Sending a 'new place's data to the server
    //(Authentication ? here or client side)
    //Push the data to 'place' collection in 'canada' db


