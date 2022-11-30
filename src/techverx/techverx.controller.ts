import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechverxService } from './techverx.service';
import { CreateTechverxDto } from './dto/create-techverx.dto';
import { UpdateTechverxDto } from './dto/update-techverx.dto';
import { TechverxDetail } from './detail-interface';

@Controller('techverx')
export class TechverxController {
  constructor(private readonly techverxService: TechverxService) {}

  @Post('add')
  async create(
    @Body() createTechverxDto: CreateTechverxDto,
  ): Promise<TechverxDetail | Object> {
    return await this.techverxService.create(createTechverxDto);
  }

  @Get('all')
  findAll() {
    return 'hello';
  }
}
