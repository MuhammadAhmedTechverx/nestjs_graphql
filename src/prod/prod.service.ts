import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProdService implements OnModuleInit {
  constructor(
    private userService: UserService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  onModuleInit() {
    console.log(`The prod module has been initialized`);
  }
  findAll() {
    return `This action returns all prod`;
  }

  async findOne(id: string) {
    const user = await this.userService.findById(id);
    if (user) return user;
    throw new HttpException('token is not valid', HttpStatus.UNAUTHORIZED);
  }
}
