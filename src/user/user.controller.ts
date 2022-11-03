import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
// import { LoggingInterceptor } from 'src/logger.interceptor';

@Controller('user')
// @UseInterceptors(LoggingInterceptor)
export class UserController {
  @UseGuards(JwtGuard)
  @Get('all')
  findAll() {
    return 'hello its user controller';
  }
}
