import { UserType } from "src/entities/enums/userTypes";
import { Field, InputType } from "type-graphql";
import { UserInput } from "./userInput";

@InputType()
export class ClassInput {
  @Field({ nullable: true })
  activityId: number

  @Field({ nullable: true })
  maxStudents: number;

  @Field({ nullable: true })
  classTime: string;

  @Field(() => UserInput,{ nullable: true })
  students: UserInput[];

}
