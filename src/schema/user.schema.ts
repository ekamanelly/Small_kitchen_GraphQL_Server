import { Field, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

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
