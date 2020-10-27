import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasicEntity } from "./basicEntity";
import { CreditCardInfo } from "./creditCardInfo";
import { UserType } from "./enums/userTypes";

@Entity({ name: "User" })
@ObjectType()
export class User extends BasicEntity {
  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  socialSecurity: string;

  @Column()
  @Field()
  birthDate: Date;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.Costumer,
  })
  @Field(() => UserType)
  userType: UserType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  creditCardInfoId?: number;

  @OneToOne(() => CreditCardInfo)
  @JoinColumn()
  creditCardInfo?: CreditCardInfo;
}
