import { Module } from '@nestjs/common';
import { Test1Service } from './test1.service';
import { Test1Controller } from './test1.controller';
import { UserModule } from 'src/user/user.module';
import { ProdModule } from 'src/prod/prod.module';

@Module({
  imports: [UserModule, ProdModule],
  controllers: [Test1Controller],
  providers: [Test1Service],
})
export class Test1Module {}
