import * as graphqlPlaygroundMiddlewareExpress from 'graphql-playground-middleware-express';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { readFileSync } from 'fs';

import { resolvers } from './resolvers';
import { db } from './db';

const typeDefs = readFileSync('./src/typeDefs.graphql', 'utf-8');
const expressPlayground = graphqlPlaygroundMiddlewareExpress.default;

async function start() {
  const app = express();

  // DB接続をここで行い、コンテキストに注入する。
  const context = { db };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  server.applyMiddleware({ app });

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

  app.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
    )
  );
}

start();
