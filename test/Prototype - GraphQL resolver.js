/* resolvers.js*/

//const {Places} /* Need to import our Places data from our database*/

const resolvers = {
    places: async (_) => {
      return Places;
    },
    place: async ({ id }, context) => {
      return Places.find((place) => place.id == id)
    }
  };


module.exports = resolvers;