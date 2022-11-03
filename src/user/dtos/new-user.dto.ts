import { Exclude } from 'class-transformer';
import { IsEmail } from '@nestjs/class-validator';
import {
  createUnionType,
  Field,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';

export class newUserDTO {
  name: string;
  @IsEmail()
  email: string;
  @Exclude()
  password: string;
}
