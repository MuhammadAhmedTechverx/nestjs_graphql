import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  StreamableFile,
  Req,
  Session,
  Ip,
  Header,
  UseGuards,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileService } from './file.service';
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtGuard)
  @Get('stream')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
  @Get('/session')
  @Header('Cache-Control', 'none')
  getViews(@Session() session: { views?: number }, @Ip() ip: string) {
    console.log('hei', ip);
    session.views = (session.views || 0) + 1;
  }
}
