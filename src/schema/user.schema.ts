import { Field, InputType, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, maxLength, MaxLength, MinLength } from "class-validator";

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
  password: String;
}

export const userModel = getModelForClass(User);

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
