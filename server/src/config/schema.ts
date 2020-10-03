import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../graphql/resolvers/userResolver";

export async function buildGraphQLSchema() {
  return buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });
}
