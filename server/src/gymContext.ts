import { Request, Response } from "express";

export interface GymContext {
  res: Response;
  req: Request;
  payload?: UserPayload;
}

export class UserPayload {
  userId: string;
  userType: string;
}
