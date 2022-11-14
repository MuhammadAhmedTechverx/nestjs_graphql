import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { LikeDocument } from 'src/schema/like.schema';
import { TechverxDocument } from 'src/schema/techverx.schema';
import { CreateTechverxDto } from './dto/create-techverx.dto';
import { UpdateTechverxDto } from './dto/update-techverx.dto';

import { hello, add } from '../../helper';

@Injectable()
export class TechverxService {
  constructor(
    @InjectModel('Techverx')
    private readonly techverxModel: Model<TechverxDocument>,
  ) {}
  async create(
    createTechverxDto: CreateTechverxDto,
  ): Promise<TechverxDocument | Object> {
    const { name, rollNo } = createTechverxDto;
    const join = add(name, rollNo);
    const check = await this.findUser(rollNo);
    if (!check) {
      const newEmployee = new this.techverxModel({
        name,
        rollNo,
      });
      const a = await newEmployee.save();
      if (a) {
        return {
          message: 'added',
          data: a,
        };
      }
    } else {
      return {
        message: 'exist already',
        data: null,
      };
    }
  }
  async findUser(rollNo: number) {
    var auth = await this.techverxModel.findOne({ rollNo: rollNo }).exec();
    // console.log(auth);
    // return;
    return auth;
  }
}
