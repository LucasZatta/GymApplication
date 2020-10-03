import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/user";

@ObjectType()
export class UserResponse {
  @Field({ nullable: true })
  errorMessage?: string;

  @Field({ nullable: true })
  user?: User;
}
