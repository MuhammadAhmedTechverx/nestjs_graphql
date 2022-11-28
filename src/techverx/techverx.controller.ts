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

  // // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.techverxService.findOne(+id);
  // }

  // // @Patch(':id')
  // // update(
  // //   @Param('id') id: string,
  // //   @Body() updateTechverxDto: UpdateTechverxDto,
  // // ) {
  // //   return this.techverxService.update(+id, updateTechverxDto);
  // // }

  // // @Delete(':id')
  // // remove(@Param('id') id: string) {
  // //   return this.techverxService.remove(+id);
  // // }
}
