import { config } from 'node-config-ts';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { addMiddleware } from 'graphql-add-middleware';
import typeDefs from './typeDefs';
import { db } from './db';
import resolvers from './resolvers';
import middlewares from './middlewares';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  // eslint-disable-next-line no-undef
  context: (context: any): any => ({
    auth: context.req.headers.authorization,
  }),
});
const app = express();
server.applyMiddleware({ app });

addMiddleware(schema, 'Mutation.createUser', middlewares.validators.createUser);
addMiddleware(schema, 'Mutation.createBooking', middlewares.validators.createBooking);
addMiddleware(schema, 'Mutation.createOrder', middlewares.validators.createOrder);
addMiddleware(schema, 'Mutation.createVoucher', middlewares.validators.createVoucher);
addMiddleware(schema, 'Mutation.createApartment', middlewares.validators.createApartment);
addMiddleware(schema, 'Mutation.editApartment', middlewares.validators.editApartment);
addMiddleware(schema, 'Mutation.editVoucher', middlewares.validators.editVoucher);
addMiddleware(schema, middlewares.auth.getUserFromHeader);
// addMiddleware(schema, 'Mutation', middlewares.auth.loggedInCheck);
// addMiddleware(schema, 'Query', middlewares.auth.isSellerCheck);

db.once('open', () => {
  app.listen({ port: 4000 }, () => console.log(`Server ready at ${config.HOST}${server.graphqlPath}`));
});
