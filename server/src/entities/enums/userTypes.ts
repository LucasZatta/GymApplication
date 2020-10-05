import { registerEnumType } from "type-graphql";

export enum UserType {
  Secretary = "SECRETARY",
  Teacher = "TEACHER",
  Doctor = "DOCTOR",
  Costumer = "COSTUMER",
}

registerEnumType(UserType, {
  name: "UserType",
  description: "Types of user",
});
