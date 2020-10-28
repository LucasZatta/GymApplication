import { Field, InputType } from "type-graphql";
import { UserInput } from "./userInput";

@InputType()
export class ExamInput {
  @Field()
  name: string;

  @Field()
  doctorId: number;

  @Field(() => UserInput)
  doctor: UserInput;

  @Field()
  socialSecurity: string;

  @Field()
  studentId: number;

  @Field(() => UserInput)
  student: UserInput;

  @Field()
  cardioFreq: number;

  @Field()
  artPressure: number;

  @Field()
  weight: number;

  @Field()
  height: number;

  @Field()
  fatPercentual: number;

  @Field()
  fitMassPercentual: number;

  @Field()
  imc: number;

  @Field()
  situation: boolean;
}
