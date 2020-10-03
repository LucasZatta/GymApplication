import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ActivityResolver } from "../graphql/resolvers/activityResolver";
import { UserResolver } from "../graphql/resolvers/userResolver";

export async function buildGraphQLSchema() {
  return buildSchema({
    resolvers: [UserResolver, ActivityResolver],
    validate: false,
  });
}
