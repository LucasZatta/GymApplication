import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { refreshToken } from "./auth/auth";
import { createDatabaseConection } from "./config/database";
import { buildGraphQLSchema } from "./config/schema";

const main = async () => {
  const conn = await createDatabaseConection();
  //await conn.runMigrations()
  //await conn.dropDatabase();
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.post("/refresh_token", refreshToken);
  const apolloServer = new ApolloServer({
    schema: await buildGraphQLSchema(),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server on");
  });
};
main().catch((err) => console.log("error: ", err));
