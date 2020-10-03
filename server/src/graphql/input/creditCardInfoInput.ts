import { Field, InputType } from "type-graphql";

@InputType()
export class CreditCardInfoInput {
  @Field()
  number: number;

  @Field()
  creditCardType: string;

  @Field()
  owner: string;
}
