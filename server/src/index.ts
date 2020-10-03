import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createDatabaseConection } from "./config/database";
import { buildGraphQLSchema } from "./config/schema";

const main = async () => {
  const conn = await createDatabaseConection();
  const apolloServer = new ApolloServer({
    schema: await buildGraphQLSchema(),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server on");
  });
};
const app = express();
main().catch((err) => console.log("error: ", err));
