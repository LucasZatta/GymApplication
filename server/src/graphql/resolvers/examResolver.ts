//import argon2 from "argon2";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { setRefreshToken } from "../../auth/auth";
import { createAccessToken } from "../../auth/jwt";
import { UserType } from "../../entities/enums/userTypes";
import { User } from "../../entities/user";
import { Exam } from "../../entities/exam";
import { GymContext } from "../../gymContext";
import { UserInput } from "../input/userInput";
import { UserLogin } from "../input/userLogin";
import { LoginResponse } from "../response/loginResponse";
import { UserResponse } from "../response/userResponse";
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
}
