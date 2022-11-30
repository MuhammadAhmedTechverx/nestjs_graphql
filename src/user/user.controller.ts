import {
  Controller,
  Get,
  Scope,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
// import { LoggingInterceptor } from 'src/logger.interceptor';

@Controller({
  path: 'user',
  scope: Scope.REQUEST,
})
// @UseInterceptors(LoggingInterceptor)
export class UserController {
  @UseGuards(JwtGuard)
  @Get('all')
  findAll() {
    return 'hello its user controller';
  }
}
