import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { newCommentDTO } from './dtos/new-comment.dto';
import { newLikeDTO } from './dtos/new-like.dto';
import { newMemoryDTO } from './dtos/new-memory.dto';
import { MemoryComment, MemoryDetail, MemoryLike } from './memory.interface';
import { MemoryService } from './memory.service';

@Controller('memory')
export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  @UseGuards(JwtGuard)
  @Post('createNewMemory')
  async register(
    @Request() req,
    @Body() memory: newMemoryDTO,
  ): Promise<MemoryDetail | null> {
    return this.memoryService.createMemory(memory, req.user.id);
  }
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('likeMemory')
  async likeMemory(
    @Request() req,
    @Body() like: newLikeDTO,
  ): Promise<MemoryLike | Object> {
    return await this.memoryService.likeMemory(like, req.user.id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('commentMemory')
  async commentMemory(
    @Request() req,
    @Body() comment: newCommentDTO,
  ): Promise<MemoryComment | Object> {
    const result = await this.memoryService.commentMemory(comment, req.user.id);
    if (result)
      return {
        message: 'Comment Successfully',
        code: 200,
        data: result,
      };
    else {
      return {
        message: 'No Memory found against this id ',
        code: 200,
        data: result,
      };
    }
  }
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteMemory(
    @Param('id') memoryId: string,
    @Request() req,
  ): Promise<Object | null> {
    const result = await this.memoryService.deleteMemory(memoryId, req.user.id);
    return result;
  }
}
