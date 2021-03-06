import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { User } from "../entities/user";
import { GymContext } from "../gymContext";
import { createAccessToken, createRefreshToken } from "./jwt";

export const isAuth: AuthChecker<GymContext> = ({ context }, roles) => {
  const auth = context.req.headers["authorization"];
  if (!auth) throw new Error("Nāo autorizado");
  try {
    const token = auth.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log("error: ", err);
    throw new Error("Nāo autorizado");
  }

  if (roles.length > 0) {
    return roles.find((x) => x === context.payload?.userType) !== undefined;
  }

  return true;
};

export const setRefreshToken = (res: Response, user: User) => {
  res.cookie("gymCookie", createRefreshToken(user), { httpOnly: true });
};

export const refreshToken = async (req: Request, res: Response) => {
  const auth = req.cookies.gymCookie;
  if (!auth) throw new Error("Nāo autorizado");

  let payload: any = null;
  try {
    payload = verify(auth, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    console.log("error: ", error);
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await User.findOne({ id: payload.userId });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  setRefreshToken(res, user);

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
