require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import { db } from './db';
import resolvers from './resolvers';
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

db.once('open', () => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at ${process.env.HOST}${server.graphqlPath}`)
  );
});
