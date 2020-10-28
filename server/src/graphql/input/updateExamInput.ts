import { Field, InputType } from "type-graphql";
import { UserInput } from "./userInput";

@InputType()
export class UpdateExamInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  doctorId?: number;

  @Field(() => UserInput)
  doctor?: UserInput;

  @Field({ nullable: true })
  studentId?: number;

  @Field(() => UserInput, { nullable: true })
  student?: UserInput;

  @Field({ nullable: true })
  cardioFreq?: number;

  @Field({ nullable: true })
  artPressure?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  fatPercentual?: number;

  @Field({ nullable: true })
  fitMassPercentual?: number;

  @Field({ nullable: true })
  imc?: number;

  @Field({ nullable: true })
  situation?: boolean;
}
