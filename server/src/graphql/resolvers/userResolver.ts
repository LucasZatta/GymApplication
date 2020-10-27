import argon2 from "argon2";
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
import { GymContext } from "../../gymContext";
import { UserInput } from "../input/userInput";
import { UserLogin } from "../input/userLogin";
import { LoginResponse } from "../response/loginResponse";
import { UserResponse } from "../response/userResponse";

@Resolver()
//Dont forget to uncoment authorized
export class UserResolver {
  @Query(() => [User])
  @Authorized()
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  @Authorized()
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return User.findOne({ id });
  }

  @Mutation(() => UserResponse)
  @Authorized(UserType.Secretary)
  async insertUser(
    @Arg("data", () => UserInput) data: UserInput
  ): Promise<UserResponse> {
    const selectedUsername = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where("u.username = :username", { username: data.username })
      .getOne();
    if (selectedUsername) return { errorMessage: "Nome de usuário já existe" };

    const selectedSocialSecurity = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where('u."socialSecurity" = :socialSecurity', {
        socialSecurity: data.socialSecurity,
      })
      .getOne();
    if (selectedSocialSecurity) return { errorMessage: "CPF já existente" };

    const hashedPassword = await argon2.hash(data.password);

    const userId = await (
      await User.insert({
        ...data,
        birthDate: new Date(parseInt(data.birthDate)),
        password: hashedPassword,
      })
    ).raw[0].id;

    const newUser = await User.findOne(userId);
    return { user: newUser };
  }

  @Query(() => User, { nullable: true })
  @Authorized()
  async me(@Ctx() { payload }: GymContext): Promise<User | undefined> {
    return User.findOne(payload?.userId);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("login", () => UserLogin) login: UserLogin,
    @Ctx() { res }: GymContext
  ): Promise<LoginResponse> {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where("u.username = :username", { username: login.username })
      .getOne();
    if (!user)
      return { accessToken: "", errorMessage: "Nome de usuário nāo existe" };

    const validPassword = await argon2.verify(user.password, login.password);
    if (!validPassword)
      return { accessToken: "", errorMessage: "Senha invalida" };

    //set session info
    setRefreshToken(res, user);

    return { accessToken: createAccessToken(user) };
  }
}
