import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import start from './db/connect.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
dotenv.config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true
});
const PORT = process.env.PORT || 8000;
start().then(async () => {
  return await server.listen({
    port: PORT
  }).then(({
    url
  }) => {
    console.log(`server started at : ${url}`);
  });
});