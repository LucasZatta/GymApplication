import { Field, InputType } from "type-graphql";
import { ExerciseInput } from "./exerciseInput";

@InputType()
export class ExerciseFileInput {
  @Field()
  name: string;

  @Field()
  teacherId: number;

  @Field()
  studentId: number;

  @Field(() => [ExerciseInput], { nullable: true })
  exercises?: ExerciseInput[];
}
