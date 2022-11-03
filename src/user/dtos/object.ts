import {
  createUnionType,
  Field,
  ID,
  InputType,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class userType {
  @Field(() => ID)
  id: string;
  @Field()
  readonly name: string | null;
  @Field()
  readonly email: string | null;
}

@ObjectType({ isAbstract: true })
// @InputType({ isAbstract: true })
export class userloginType {
  @Field()
  result: string;
}

@ObjectType({ isAbstract: true })
export class Error {
  @Field({ nullable: true })
  message: string;
}
@ObjectType({ isAbstract: true })
export class UserResponse extends Error {
  @Field({ nullable: true })
  result: userType;
}

@ObjectType({ isAbstract: true })
export class UserResponse1 extends Error {
  @Field({ nullable: true })
  result: userloginType;
}

// export const ResultUnion = createUnionType({
//   name: 'ResultUnion',
//   types: () => [userloginType, Error] as const,
// });

// export const ResultUnion = createUnionType({
//   name: 'Result',
//   types: () => [userloginType, Error] as const,
//   resolveType(value) {
//     if (value.token) {
//       return userloginType;
//     }
//     if (value.error) {
//       return Error;
//     }
//     return null;
//   },
// });
