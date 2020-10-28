import argon2 from "argon2";
import { getConnection } from "typeorm";
import { UserType } from "src/entities/enums/userTypes";
import {
  Arg,
  Authorized,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Exam } from "../../entities/exam";
import { ExamInput } from "../input/examInput";
import { UpdateExamInput } from "../input/updateExamInput";
import { ExamResponse } from "../response/examResponse";

@Resolver()
export class ExamResolver {
  @Query(() => [Exam])
  @Authorized()
  async exams(): Promise<Exam[]> {
    return Exam.find();
  }

  @Query(() => Exam)
  @Authorized([UserType.Doctor,UserType.Costumer])
  async exam(@Arg("id", () => Int) id: number): Promise<Exam | undefined> {
    return Exam.findOne({ id });
  }

  @Mutation(() => ExamResponse)
  @Authorized(UserType.Doctor)
  async registerExam(@Arg("data", () => ExamInput) data: ExamInput
  ): Promise<ExamResponse> {
      if(!data.student) return {errorMessage: "Exame não designado"};
      const newExam = (
          await Exam.insert({
              studentId: data.studentId,
              doctorId: data.doctorId,
              name: data.name,
              doctor: data.doctor,
              student: data.student,
              cardioFreq: data.cardioFreq,
              artPressure: data.artPressure,
              weight: data.weight,
              height: data.height,
              fatPercentual: data.fatPercentual,
              fitMassPercentual: data.fitMassPercentual,
              imc: data.imc,
              situation: data.situation,
          })
      ).raw[0].id;

      const returnExam = await getConnection()
          .getRepository(Exam)
          .createQueryBuilder("ex")
          .where("ex.studentId = :studentId", { studentId: data.studentId })
          .getOne();
        if (!returnExam) return { errorMessage: "Falha na criação do exame." }
        return { exam: returnExam };
       
  }

  @Mutation(() => ExamResponse)
  @Authorized(UserType.Doctor)
  async updateExam(@Arg("data", () => UpdateExamInput) data: UpdateExamInput, @Arg("id", () => Int) id: number
  ): Promise<ExamResponse> {
    const exam = await Exam.findOne({ where: { id } });
    if (!exam) throw new Error("Exam not found!");
    Object.assign(exam, data);
    await exam.save();

    return { exam: exam};
  }

  @Mutation(() => Boolean)
  @Authorized(UserType.Doctor)
  async deleteExam(@Arg("id", () => Int) id: number){
      const exam = await Exam.findOne({ where: { id } });
      if(!exam) throw new Error("Exam not found!");
      await exam.remove();

    return true;
  }
}
