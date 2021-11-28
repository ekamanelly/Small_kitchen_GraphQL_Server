console.log("google");
import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { resolvers } from "./resolvers";

const port = 4000;
async function createServer() {
  //Build schema
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });
  // init app
  const app = express();
  app.use(cookieParser());

  // create apollo-server

  const server = new ApolloServer({
    schema,
    context: (ctx) => ctx,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  // apply middleware to server
  server.applyMiddleware({ app });
  app.listen(port, () => console.log("app connect to port " + port));
}

createServer();
