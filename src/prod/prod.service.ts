import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
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
    return `there is no user against this id`;
  }
}
