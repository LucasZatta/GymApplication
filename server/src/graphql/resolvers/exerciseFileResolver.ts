import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { UserType } from "../../entities/enums/userTypes";
import { Exercise } from "../../entities/exercise";
import { ExerciseFile } from "../../entities/exerciseFile";
import { ExerciseFileInput } from "../input/exerciseFileInput";
import { ExerciseFileResponse } from "../response/exerciseFileResponse";

@Resolver()
//Dont forget to uncoment authorized
export class ExerciseFileResolver {
  @Query(() => [ExerciseFile])
  @Authorized()
  async exerciseFiles(
    @Arg("teacherId", () => Int) teacherId: number
  ): Promise<ExerciseFile[]> {
    return await getConnection()
      .getRepository(ExerciseFile)
      .createQueryBuilder("ef")
      .leftJoinAndSelect("ef.exercises", "exercise")
      .where('ef."teacherId" = :id', { teacherId })
      .getMany();
  }

  @Query(() => ExerciseFile)
  @Authorized()
  async exerciseFile(
    @Arg("id", () => Int) id: number
  ): Promise<ExerciseFile | undefined> {
    return ExerciseFile.findOne({ id });
  }

  @Mutation(() => ExerciseFileResponse)
  @Authorized(UserType.Teacher)
  async registerExerciseFile(
    @Arg("data", () => ExerciseFileInput) data: ExerciseFileInput
  ): Promise<ExerciseFileResponse> {
    if (!data.exercises) return { errorMessage: "Insira exercicios na ficha" };
    const exerciseId = (
      await ExerciseFile.insert({
        teacherId: data.teacherId,
        studentId: data.studentId,
        name: data.name,
      })
    ).raw[0].id;
    await Exercise.insert(data.exercises);
    const newExerciseFile = await getConnection()
      .getRepository(ExerciseFile)
      .createQueryBuilder("ef")
      .leftJoinAndSelect("ef.exercises", "exercise")
      .where("ef.id = :id", { exerciseId })
      .getOne();
    return { exerciseFile: newExerciseFile };
  }

  @Mutation(() => ExerciseFileResponse)
  @Authorized(UserType.Teacher)
  async updateExerciseFile(
    @Arg("data", () => ExerciseFileInput) data: ExerciseFileInput,
    @Arg("id", () => Int) id: number
  ): Promise<ExerciseFileResponse> {
    if (!data.exercises) return { errorMessage: "Insira exercicios na ficha" };
    //delete old exercises
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Exercise)
      .where('"exerciseFileId" = :id', { id })
      .execute();
    //insert new
    await Exercise.insert(data.exercises);
    //update
    const exerciseId = (
      await ExerciseFile.update(id, {
        teacherId: data.teacherId,
        studentId: data.studentId,
        name: data.name,
      })
    ).raw[0].id;
    const updatedExerciseFile = await getConnection()
      .getRepository(ExerciseFile)
      .createQueryBuilder("ef")
      .leftJoinAndSelect("ef.exercises", "exercise")
      .where("ef.id = :id", { exerciseId })
      .getOne();
    return { exerciseFile: updatedExerciseFile };
  }

  @Mutation(() => Boolean)
  @Authorized(UserType.Teacher)
  async deleteExerciseFile(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Exercise)
      .where('"exerciseFileId" = :id', { id })
      .execute();
    await ExerciseFile.delete(id);
    return true;
  }
}
