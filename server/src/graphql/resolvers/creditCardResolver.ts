import { CreditCardInfo } from "src/entities/creditCardInfo";
import { User } from "src/entities/user";
import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Activity } from "../../entities/activity";
import { ActivityPricing } from "../../entities/activityPricing";
import { Class } from "../../entities/class";
import { ActivityInput, PricingInput } from "../input/activityInput";
import { ClassInput } from "../input/classInput";
import { UserInput } from "../input/userInput";
import { ActivityResponse } from "../response/activityResponse";

@Resolver()
//Dont forget to uncoment authorized
export class CreditCardResolver {
    @Query(() => CreditCardInfo)
    @Authorized()
    async creditCard
}
