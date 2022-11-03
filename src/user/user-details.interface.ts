import { Field, ObjectType } from "@nestjs/graphql";

export interface UserDetail {
  id: string;
  name: string;
  email: string;
}


