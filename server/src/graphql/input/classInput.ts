import { Field, InputType } from "type-graphql";

@InputType()
export class ClassInput {
  @Field({ nullable: true })
  maxStudents: number;

  @Field({ nullable: true })
  classTime: string;
}
