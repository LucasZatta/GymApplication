import { Field, ObjectType } from "type-graphql";
import { Activity } from "../../entities/activity";
import { BaseResponse } from "./baseResponse";

@ObjectType()
export class ActivityResponse extends BaseResponse {
  @Field({ nullable: true })
  activity?: Activity;
}
