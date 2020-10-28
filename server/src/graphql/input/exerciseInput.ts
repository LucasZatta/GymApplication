import { Field, InputType } from "type-graphql";

@InputType()
export class ExerciseInput {
  @Field()
  name: string;

  @Field()
  series: number;

  @Field()
  reps: number;
}
