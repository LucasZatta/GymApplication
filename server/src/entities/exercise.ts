import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BasicEntity } from "./basicEntity";
import { ExerciseFile } from "./exerciseFile";

@Entity()
@ObjectType()
export class Exercise extends BasicEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  series: number;

  @Field()
  @Column()
  reps: number;

  @Field()
  @Column()
  exerciseFileId: number;

  @Field(() => ExerciseFile, { nullable: true })
  @ManyToOne(() => ExerciseFile, (exerciseFile) => exerciseFile.exercises)
  exerciseFile?: ExerciseFile;
}
