//import argon2 from "argon2";
import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Exam } from "../../entities/exam";
import { ExamInput } from "../input/examInput";
import { UpdateExamInput } from "../input/updateExamInput";

@Resolver()
//Dont forget to uncoment authorized
export class ExamResolver {
  @Query(() => [Exam])
  //@Authorized()
  async exams(): Promise<Exam[]> {
    return Exam.find();
  }

  @Query(() => Exam)
  async exam(@Arg("id", () => Int) id: number): Promise<Exam | undefined> {
    return Exam.findOne({ id });
  }

  @Mutation(() => Exam)
  async createExam(@Arg("data") data: ExamInput){
      const exam = Exam.create(data);
      await exam.save();
      return exam;
  }

  @Mutation(() => Exam)
  async updateExam(@Arg("id", () => Int) id: number, @Arg("data") data: UpdateExamInput) {
    const exam = await Exam.findOne({ where: { id } });
    if (!exam) throw new Error("Exam not found!");
    Object.assign(exam, data);
    await exam.save();
    return exam;
  }

  @Mutation(() => Boolean)
  async deleteExam(@Arg("id", () => Int) id: number){
      const exam = await Exam.findOne({ where: { id } });
      if(!exam) throw new Error("Exam not found!");
      await exam.remove();

      return true;
  }
}
