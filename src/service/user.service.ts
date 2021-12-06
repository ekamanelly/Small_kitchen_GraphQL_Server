import { ApolloError } from "apollo-server-errors";
import { isEmail, validate } from "class-validator";
import { LoginInput, userModel } from "../schema/user.schema";
import bcrypt from "bcrypt";
import { signJwt } from "../helper/jwt";
import { BuildContext } from "type-graphql/dist/schema/build-context";
import Context from "../types/context";

export default class UserService {
  async createUser(input: any) {
    return userModel.create(input);
  }
  async login(input: LoginInput, context: Context) {
    const errorMessage = "invalid email and pass word";
    // get user by isEmail
    const user = await userModel.find().findByEmail(input.email).lean();
    // return userModel.create(input);

    if (!user) {
      throw new ApolloError(errorMessage);
    }
    // validate password
    const validPassword = await bcrypt.compare(input.password, user.password);
    if (!validPassword) {
      throw new ApolloError(errorMessage);
    }
    // sign a jwt
    const token = signJwt(user);
    context.res.cookie("accessToken", token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return token;
  }
}
