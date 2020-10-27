import { Field, InputType } from "type-graphql";
import { PricingType } from "../../entities/enums/pricingType";
import { ClassInput } from "./classInput";

@InputType()
export class ActivityInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [ClassInput], { nullable: true })
  classes?: ClassInput[];

  @Field(() => [PricingInput], { nullable: true })
  pricings?: PricingInput[];
}

@InputType()
export class PricingInput {
  @Field(() => PricingType)
  type: PricingType;

  @Field()
  payments: number;

  @Field()
  installment: number;
}
