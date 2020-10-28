import { CreditCardInfo } from "src/entities/creditCardInfo";
import { Authorized, Query, Resolver } from "type-graphql";

@Resolver()
//Dont forget to uncoment authorized
export class CreditCardResolver {
  @Query(() => CreditCardInfo)
  @Authorized()
  async creditCard() {}
}
