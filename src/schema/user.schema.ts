import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop()
  name: string;
  @Field()
  @Prop({ unique: true })
  email: string;
  @Field()
  @Prop()
  password: string;
  @Field()
  @Prop({ required: false })
  otp_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
