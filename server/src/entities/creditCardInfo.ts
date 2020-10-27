import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BasicEntity } from "./basicEntity";

@Entity()
@ObjectType()
export class CreditCardInfo extends BasicEntity {
  @Column()
  @Field()
  number: number;

  @Column()
  @Field()
  creditCardType: string;

  @Column()
  @Field()
  owner: string;
}
