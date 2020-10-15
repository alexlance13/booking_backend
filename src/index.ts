require('dotenv').config();
import express from 'express';
import { ApolloServer, } from 'apollo-server-express';
import typeDefs from './typeDefs';
import { db } from './db';
import resolvers from './resolvers';
import { makeExecutableSchema } from "graphql-tools";
import { addMiddleware } from 'graphql-add-middleware';
import { userValidation } from './middlewares';

export const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({schema});
const app = express();
server.applyMiddleware({ app });

addMiddleware(schema, 'Mutation.createUser', userValidation)

db.once('open', () => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at ${process.env.HOST}${server.graphqlPath}`)
  );
});
