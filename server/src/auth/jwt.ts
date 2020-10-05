import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities/user";

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.id, userType: user.userType.valueOf() },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, userType: user.userType.valueOf() },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const setRefreshToken = (res: Response, user: User) => {
  res.cookie("gymCookie", createRefreshToken(user), { httpOnly: true });
};
