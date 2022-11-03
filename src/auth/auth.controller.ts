import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { newUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetail } from 'src/user/user-details.interface';
import { UserDocument } from 'src/schema/user.schema';
import { AuthService } from './auth.service';

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
    return this.authService.login(user);
  }
}
