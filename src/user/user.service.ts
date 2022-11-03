import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { UserDetail } from './user-details.interface';

import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetail {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetail | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    // const saltOrRounds = process.env.saltValue;

    const salt = await bcrypt.genSalt();
    const newUser = new this.userModel({
      name,
      email,
      password: await this.hashPassword(hashedPassword, salt),
    });
    // console.log(newUser);return;
    return newUser.save();
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetail | null> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) return null;

    // if(password ==  user.password){
    //     return this._getUserDetails(user)
    // }
    // else{
    //     return null;
    // }
    if (user) {
      const passwordMatch = await this.compareIt(password, user.password);
      if (passwordMatch) {
        return this._getUserDetails(user);
      } else {
        return null;
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  private async compareIt(password: string, hashedPassword: string) {
    const validPassword = await bcrypt.compareSync(password, hashedPassword);
    return validPassword;
  }
}
