import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/user";
import { BaseResponse } from "./baseResponse";

@ObjectType()
export class UserResponse extends BaseResponse {
  @Field({ nullable: true })
  user?: User;
}
