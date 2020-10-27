import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { ActivityPricing } from "./activityPricing";
import { BasicEntity } from "./basicEntity";
import { Class } from "./class";

@Entity()
@ObjectType()
export class Activity extends BasicEntity {
  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Class], { nullable: true })
  @OneToMany(() => Class, (Class) => Class.activity)
  classes?: Class[];

  @Field(() => [ActivityPricing], { nullable: true })
  @OneToMany(
    () => ActivityPricing,
    (activityPricing) => activityPricing.activity
  )
  priceOptions?: ActivityPricing[];
}
