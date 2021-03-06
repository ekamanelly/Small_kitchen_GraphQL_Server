import { Field, InputType, ObjectType } from "type-graphql";
import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { IsEmail, maxLength, MaxLength, MinLength } from "class-validator";
import bcrypt from "bcrypt";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}
function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}
@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: String;

  @Field(() => String)
  @prop({ required: true })
  email: String;

  @prop({ required: true })
  password: string;
}

export const userModel = getModelForClass<typeof User, QueryHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: String;

  @IsEmail()
  @Field(() => String)
  email: String;

  @MaxLength(15, {
    message: "password should be 18 character or lest ",
  })
  @MinLength(6, {
    message: "password must be at least six character",
  })
  @Field(() => String)
  password: String;
}
@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
