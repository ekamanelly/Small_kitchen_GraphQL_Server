// import { HttpQueryRequest } from "apollo-server-core";
import { Request, Response } from "express";
import { User } from "../schema/user.schema";
export default interface Context {
  req: Request;
  res: Response;
  user: User;
}
