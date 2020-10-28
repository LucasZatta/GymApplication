import { Field, ObjectType } from "type-graphql";
import { ExerciseFile } from "../../entities/exerciseFile";
import { BaseResponse } from "./baseResponse";

@ObjectType()
export class ExerciseFileResponse extends BaseResponse {
  @Field({ nullable: true })
  exerciseFile?: ExerciseFile;
}
