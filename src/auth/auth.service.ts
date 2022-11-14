import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
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
    private readonly mailerService: MailerService,
  ) {}
  async register(user: Readonly<newUserDTO>): Promise<UserDetail | any> {
    const { name, email, password } = user;
    const exist = await this.userService.findByEmail(email);
    // .catch((err) => console.log(err));
    if (exist) return { message: 'email taken' };
    const newUser = await this.userService.create(name, email, password);
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
    const sentEmail = await this.example(user);
    return {
      message: 'User Login successfully',
      result: { result: jwt },
    };
  }
  public example(user: object): any {
    const path = `${__dirname.split('dist')[0]}/src/mails`;
    this.mailerService
      .sendMail({
        to: 'dihit12654@lance7.com', // list of receivers
        from: 'abc@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        // html: '<b>welcome</b>', // HTML body content
        template: `${path}/superhero.hbs`,
        context: {
          info: user,
        },
      })
      .then(() => {
        return 'success';
      })
      .catch(() => {});
  }
}
