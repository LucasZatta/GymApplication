import { registerEnumType } from "type-graphql";

export enum UserType {
  Secretary = 0,
  Teacher = 1,
  Doctor = 2,
  Costumer = 3,
}

registerEnumType(UserType, {
  name: "UserType",
  description: "Types of user",
});
