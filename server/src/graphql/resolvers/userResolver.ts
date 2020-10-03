import argon2 from "argon2";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/user";
import { UserInput } from "../input/userInput";
import { UserResponse } from "../response/userResponse";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  async user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return User.findOne({ id });
  }
  //hash
  //verify
  @Mutation(() => UserResponse)
  async insertUser(
    @Arg("data", () => UserInput) data: UserInput
  ): Promise<UserResponse> {
    console.log(data);
    const selectedUsername = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where("u.username = :username", { username: data.username })
      .getOne();
    if (selectedUsername)
      return {
        errorMessage: "Nome de usuário já existe",
      };

    const selectedSocialSecurity = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where('u."socialSecurity" = :socialSecurity', {
        socialSecurity: data.socialSecurity,
      })
      .getOne();
    if (selectedSocialSecurity)
      return {
        errorMessage: "CPF já existente",
      };

    const hashedPassword = await argon2.hash(data.password);

    const userId = await (
      await User.insert({
        ...data,
        birthDate: new Date(parseInt(data.birthDate)),
        password: hashedPassword,
      })
    ).raw[0].id;

    const newUser = await User.findOne(userId);
    return {
      user: newUser,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data", () => UserInput) data: UserInput
  ): Promise<UserResponse> {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where("u.username = :username", { username: data.username })
      .getOne();
    if (!user)
      return {
        errorMessage: "Nome de usuário nāo existe",
      };

    const validPassword = await argon2.verify(user.password, data.password);
    if (!validPassword)
      return {
        errorMessage: "Invalid password",
      };
    return {
      user,
    };
  }
}
