import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { newUserDTO } from 'src/user/dtos/new-user.dto';
import { forgotUserPasswordDTO } from 'src/user/dtos/forgotPassword-user.dto';
import { UserDetail } from 'src/user/user-details.interface';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(user: Readonly<newUserDTO>): Promise<UserDetail | any> {
    const { name, email, password } = user;
    const exist = await this.userService
      .findByEmail(email)
      .catch((err) => console.log(err));
    if (exist) return { message: 'email taken' };
    const newUser = await this.userService.create(name, email, password);
    // return this.userService._getUserDetails(newUser);
    return {
      message: 'User added successfully',
      result: this.userService._getUserDetails(newUser),
    };
    return newUser;
  }

  // async login(existingUser: ExistingUserDTO): Promise<{ token } | any> {
  //   const { email, password } = existingUser;
  //   const user = await this.userService.validateUser(email, password);
  //   if (!user)
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         message: 'This is a custom message',
  //         result: null,
  //       },
  //       HttpStatus.FORBIDDEN,
  //     );
  //   const jwt = await this.jwtService.signAsync({ user });
  //   // return { token: jwt };
  //   return {
  //     message: 'User Login successfully',
  //     result: { token: jwt },
  //   };
  // }
  async login(existingUser: ExistingUserDTO): Promise<{ token } | any> {
    const { email, password } = existingUser;
    const user = await this.userService.validateUser(email, password);
    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    const jwt = await this.jwtService.signAsync({ user });
    // return { token: jwt };
    return {
      message: 'User Login successfully',
      result: { result: jwt },
    };
  }
}
