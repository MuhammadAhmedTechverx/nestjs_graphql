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
    // if (result) {
    //   return {

    //     data: result,
    //   };
    // }
    // return {
    //   message: 'added successfully',
    //   data: result,
    // };
    // return result;
  }

  // @Get('all')
  // // findAll() {
  // //   return this.techverxService.findAll();
  // // }

  // // @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.techverxService.findOne(+id);
  // // }

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
