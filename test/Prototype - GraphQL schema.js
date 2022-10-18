/* schema.js */

/*How is the gltfPath being used?*/ 
/*How is the gltfMasses being used?*/ 
/*What is in Properties?*/

//Objects will have coordinates

const { buildSchema } = require("graphql");

const schema = buildSchema(`

    type Query{
        places: [Place!]!,
        place(id: String!): Place!
    }

    type Place{
        name: String!
        id: String!
        gltfPath: String
        gltfMasses: String
        ifcPath: String
        jsonPropertiesPath:
        //coordinates: [Coordinates!] //placeGeojson takes care of that
        context: [Context]
        placeGeojson: [PlaceGeojson]
    }

    type Coordinates{
        lat: Float!
        lng: Float!
        msl: Float
        //zoom: Float
        angle: Float
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