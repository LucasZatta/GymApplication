import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { isAuth } from "../auth/auth";
import { ActivityResolver } from "../graphql/resolvers/activityResolver";
import { ExamResolver } from "../graphql/resolvers/examResolver";
import { ExerciseFileResolver } from "../graphql/resolvers/exerciseFileResolver";
import { UserResolver } from "../graphql/resolvers/userResolver";

export async function buildGraphQLSchema() {
  return buildSchema({
    resolvers: [
      UserResolver,
      ActivityResolver,
      ExerciseFileResolver,
      ExamResolver,
    ],
    validate: false,
    authChecker: isAuth,
  });
}
