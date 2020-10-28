import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BasicEntity } from "./basicEntity";
import { Exercise } from "./exercise";
import { User } from "./user";

@Entity()
@ObjectType()
export class ExerciseFile extends BasicEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  teacherId: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn()
  teacher: User;

  @Field()
  @Column()
  studentId: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn()
  student: User;

  @Field(() => [Exercise], { nullable: true })
  @OneToMany(() => Exercise, (exercise) => exercise.exerciseFile)
  exercises?: Exercise[];
}
