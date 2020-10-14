const helloResolver = require('./queries/hello.ts');
const apartmentResolver = require('./queries/apartment.ts');

const rootResolver = {
  Query: {
    ...apartmentResolver,
    ...helloResolver,
  },
};

module.exports = rootResolver;
