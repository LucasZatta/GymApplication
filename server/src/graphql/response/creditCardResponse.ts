import { Field, ObjectType } from "type-graphql";
import { CreditCardInfo } from "../../entities/creditCardInfo";
import { BaseResponse } from "./baseResponse";

@ObjectType()
export class CreditCardResponse extends BaseResponse {
  @Field({ nullable: true })
  creditCardInfo?: CreditCardInfo;
}
