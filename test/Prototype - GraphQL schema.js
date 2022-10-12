/* schema.js */

/*How is the gltfPath being used?*/ 
/*How is the gltfMasses being used?*/ 
/*What is in Properties?*/

const { buildSchema } = require("graphql");

const schema = buildSchema(`

    type Query{

    }
    
    type Place{
        name: String!
        id: String!
        gltfPath: String
        gltfMasses: String
        ifcPath: String
        jsonPropertiesPath:
        coordinates: [Coordinates!]
        context: [Context]
        placeGeojson: [PlaceGeojson]
    }

    type Coordinates{
        lat: Float!
        lng: Float!
        msl: Float
        zoom: Float
    }

    type PlaceGeojson{
        type: String!
        features: [Features]
    }

    type Features{
        id: String!
        type: String!
        properties: [Properties]
        geometry: [Geometry]
    }

    type Geometry{
        coordinates: [Coordinates!]
        type: String!
    }

    type Properties{

    }

`);

module.exports = schema;