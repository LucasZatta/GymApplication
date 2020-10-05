import { Field, ObjectType } from "type-graphql";
import { BaseResponse } from "./baseResponse";

@ObjectType()
export class LoginResponse extends BaseResponse {
  @Field()
  accessToken: string;
}
