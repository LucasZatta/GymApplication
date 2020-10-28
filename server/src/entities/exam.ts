import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BasicEntity } from "./basicEntity";
import { User } from "./user";

@Entity()
@ObjectType()
export class Exam extends BasicEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  socialSecurity: string;

  @Field()
  @Column()
  doctorId: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn()
  doctor: User;

  @Field()
  @Column()
  studentId: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn()
  student: User;

  @Field()
  @Column()
  cardioFreq: number;

  @Field()
  @Column()
  artPressure: number;

  @Field()
  @Column()
  weight: number;

  @Field()
  @Column()
  height: number;

  @Field()
  @Column()
  fatPercentual: number;

  @Field()
  @Column()
  fitMassPercentual: number;

  @Field()
  @Column()
  imc: number;

  @Field()
  @Column()
  situation: boolean;
}
