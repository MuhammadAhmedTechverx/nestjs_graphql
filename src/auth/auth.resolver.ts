import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UserLoginInput } from 'src/schema/user.schema';
import { newUserDTO } from 'src/user/dtos/new-user.dto';
import {
  userloginType,
  UserResponse,
  UserResponse1,
  userType,
} from 'src/user/dtos/object';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => UserResponse)
  async createUser(@Args('input') input: CreateUserInput) {
    const val = await this.authService.register(input);

    return val;
  }

  @Query(() => UserResponse1)
  async login(@Args('input') input: UserLoginInput) {
    const val = await this.authService.login(input);
    return val;
  }

  // @Query(() => ResultUnion)
  // async login(@Args('input') input: UserLoginInput) {
  //   console.log('hello');
  //   const val = await this.authService.login(input);
  //   return [new val(), Error()];
  // }
}
