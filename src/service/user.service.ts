import { userModel } from "../schema/user.schema";

export default class UserService {
  async createUser(input: any) {
    return userModel.create(input);
  }
}
