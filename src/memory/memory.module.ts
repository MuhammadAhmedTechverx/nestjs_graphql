import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoryController } from './memory.controller';
import { MemorySchema } from '../schema/memory.schema';
import { MemoryService } from './memory.service';
import { LikeSchema } from 'src/schema/like.schema';
import { CommentSchema } from 'src/schema/comment.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Memory', schema: MemorySchema }]),
  MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }]),
  MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryService],
})
export class MemoryModule {}
