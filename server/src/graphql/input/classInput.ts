import { UserType } from "src/entities/enums/userTypes";
import { Field, InputType, Int } from "type-graphql";
import { UserInput } from "./userInput";

@InputType()
export class ClassInput {
  @Field({ nullable: true })
  activityId: number

  @Field({ nullable: true })
  maxStudents: number;

  @Field({ nullable: true })
  classTime: string;

  @Field(() => [String],{ nullable: true })
  students: string[];

}
