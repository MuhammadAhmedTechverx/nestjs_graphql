import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { UserController } from './user.controller';
import { User, UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';

const dotenv = require('dotenv');

dotenv.config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
