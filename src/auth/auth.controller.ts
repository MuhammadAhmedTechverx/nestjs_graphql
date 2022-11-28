import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Render,
  HttpException,
} from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { newUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetail } from 'src/user/user-details.interface';
import { UserDocument } from 'src/schema/user.schema';
import { AuthService } from './auth.service';
import { forgotUserPasswordDTO } from 'src/user/dtos/forgotPassword-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: newUserDTO): Promise<UserDetail | null> {
    return this.authService.register(user);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    try {
      return await this.authService.login(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'User doesnt exist',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('forgotPassword')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() email: forgotUserPasswordDTO,
  ): Promise<UserDetail | null> {
    return await this.authService.userForgotPassword(email);
  }

  @Get('verifyotp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() Otp: string): Promise<UserDetail | null> {
    return await this.authService.otpVerify(Otp);
  }
}
