import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Activity } from "./activity";

@Entity()
@ObjectType()
export class Class extends BaseEntity {
  @PrimaryColumn()
  @Field()
  activityId: number;

  @ManyToOne(() => Activity, (activity) => activity.classes)
  activity?: Activity;

  @PrimaryColumn({ type: "time with time zone", unique: true })
  @Field()
  time: string;

  @Column("text", { array: true })
  @Field(() => [String])
  students: string[];

  @Column()
  @Field()
  maxStudents: number;
}
