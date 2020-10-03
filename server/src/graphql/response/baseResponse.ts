import { Field, ObjectType } from "type-graphql";

//Kinda bad name - ngl
@ObjectType()
export class BaseResponse {
  @Field({ nullable: true })
  errorMessage?: string;

  //Maybe add field validation?
}
