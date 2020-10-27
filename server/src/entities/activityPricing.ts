import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Activity } from "./activity";
import { PricingType } from "./enums/pricingType";

@Entity()
@ObjectType()
export class ActivityPricing extends BaseEntity {
  @PrimaryColumn()
  @Field()
  activityId: number;

  @Field(() => Activity)
  @ManyToOne(() => Activity, (activity) => activity.priceOptions)
  activity: Activity;

  @PrimaryColumn({
    type: "enum",
    enum: PricingType,
  })
  @Field(() => PricingType)
  type: PricingType;

  @Column({ type: "integer" })
  @Field()
  payments: number;

  @Column({ type: "decimal" })
  @Field()
  installment: number;
}
