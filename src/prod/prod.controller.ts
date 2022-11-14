import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProdService } from './prod.service';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('prod')
export class ProdController {
  constructor(private readonly prodService: ProdService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.prodService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  // findOne(@Param('id',ParseIntPipe) id: number) {
  findOne(@Param('id') id: string) {
    return this.prodService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post('/upload') // API path
  @UseInterceptors(
    FileInterceptor(
      'image', // name of the field being passed
      {
        storage: diskStorage({
          destination: './uploads/image',
          filename: (req, file, callBack) => {
            const filename =
              path.parse(file.originalname).name.replace(/\s/g, '') +
              Date.now();
            const extension = path.parse(file.originalname).ext;
            callBack(null, `${filename}${extension}`);
          },
        }),
      },
    ),
  )
  async upload(@UploadedFile() file): Promise<any> {
    return file;
  }
}
