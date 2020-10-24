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
    operationName: context.req.body.operationName,
  }),
});
const app = express();
server.applyMiddleware({ app });

addMiddleware(schema, middlewares.auth.getUserFromHeader);
// Adding all validator middlewares
Object.keys(resolvers.Mutation).forEach((key): void => {
  if (middlewares.validators[key]) addMiddleware(schema, `Mutation.${key}`, middlewares.validators[key]);
});

addMiddleware(schema, 'Mutation', middlewares.auth.loggedInCheck);

addMiddleware(schema, 'Mutation.createOrder', middlewares.auth.isBuyerCheck);
addMiddleware(schema, 'Mutation.createBooking', middlewares.auth.isBuyerCheck);

addMiddleware(schema, 'Mutation.createApartment', middlewares.auth.isSellerCheck);
addMiddleware(schema, 'Mutation.createVoucher', middlewares.auth.isSellerCheck);
addMiddleware(schema, 'Mutation.removeApartment', middlewares.auth.isSellerCheck);
addMiddleware(schema, 'Mutation.removeVoucher', middlewares.auth.isSellerCheck);

db.once('open', () => {
  app.listen({ port: 4000 }, () => console.log(`Server ready at ${config.HOST}${server.graphqlPath}`));
});
