/* Resolvers.js */

// const {Places} /* Need to import our Places data from our database*/

const resolvers = {
  places: async (_) => Places,
  place: async ({ id }, context) => Places.find((place) => place.id == id),
};

module.exports = resolvers;
