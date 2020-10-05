import { Request, Response } from "express";
import { GymPayload } from "./payload";

export interface GymContext {
  res: Response;
  req: Request;
  payload?: GymPayload;
}
