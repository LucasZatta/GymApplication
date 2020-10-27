import { Field, InputType } from "type-graphql";
import { UserType } from "../../entities/enums/userTypes";
import { CreditCardInfoInput } from "./creditCardInfoInput";
import { UserLogin } from "./userLogin";

@InputType()
export class UserInput extends UserLogin {
  @Field()
  name: string;

  @Field()
  socialSecurity: string;

  @Field()
  birthDate: string;

  @Field(() => UserType)
  userType: UserType;

  @Field({ nullable: true })
  creditCardInfo?: CreditCardInfoInput;
}
