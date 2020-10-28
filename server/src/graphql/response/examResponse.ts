import { Field, ObjectType } from "type-graphql";
import { Exam } from "../../entities/exam";
import { BaseResponse } from "./baseResponse";

@ObjectType()
export class ExamResponse extends BaseResponse {
  @Field({ nullable: true })
  exam?: Exam;
}
