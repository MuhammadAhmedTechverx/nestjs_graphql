import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { newMemoryDTO } from './dtos/new-memory.dto';

import { MemoryDocument } from '../schema/memory.schema';
import { LikeDocument } from 'src/schema/like.schema';
import { CommentDocument } from 'src/schema/comment.schema';
import { newLikeDTO } from './dtos/new-like.dto';
import { newCommentDTO } from './dtos/new-comment.dto';

@Injectable()
export class MemoryService {
  constructor(
    @InjectModel('Memory') private readonly memoryModel: Model<MemoryDocument>,
    @InjectModel('Like') private readonly likeModel: Model<LikeDocument>,
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async createMemory(
    memory: Readonly<newMemoryDTO>,
    userID: string,
  ): Promise<MemoryDocument> {
    const { title, description, images, tags, sharefrom } = memory;
    if (sharefrom) {
      const newMemory = new this.memoryModel({
        title,
        description,
        images,
        tags,
        userId: userID,
        sharefrom,
      });
      return newMemory.save();
    } else {
      const newMemory = new this.memoryModel({
        title,
        description,
        images,
        tags,
        userId: userID,
      });
      return newMemory.save();
    }
  }
  async likeMemory(
    like: Readonly<newLikeDTO>,
    userID: string,
  ): Promise<LikeDocument | Object> {
    const { memoryId, flag } = like;

    const memory = await this.memoryModel.findById(memoryId);
    if (memory) {
      const memoryBeforeLiked = await this.likeModel.findOne({
        memoryId: memoryId,
        userId: userID,
      });
      // console.log(memoryBeforeLiked);return;

      if (memoryBeforeLiked) {
        const unlike = await this.likeModel.deleteOne({
          id: memoryBeforeLiked._id,
        });
        return {
          message: 'UnLiked Successfully',
        };
      } else {
        if (memory) {
          const newLike = new this.likeModel({
            userId: userID,
            memoryId,
            flag,
          });

          await newLike.save();
          return {
            message: 'Liked Successfully',
            data: newLike,
          };
          // return newLike;
        }
      }
    } else {
      return {
        message: 'there s no memory exist against this id',
      };
    }

    //     const newLike = new this.likeModel({
    //   userId : userID,
    //   memoryId,
    //   flag
    // });
    // return newLike.save();
  }
  async commentMemory(
    comments: Readonly<newCommentDTO>,
    userID: string,
  ): Promise<CommentDocument> {
    const { memoryId, comment } = comments;
    // console.log(comment);return;

    const memory = await this.memoryModel.findById(memoryId);
    // console.log(memoryBeforeLiked);return;
    if (memory) {
      const newComment = new this.commentModel({
        userId: userID,
        comment,
        memoryId,
      });
      await newComment.save();
      return newComment;
    } else {
      return null;
    }
  }
  async deleteMemory(memoryId: string, userID: string): Promise<Object | null> {
    try {
      const memory = await this.memoryModel.findOne({
        _id: memoryId,
        userId: userID,
      });
      if (memory) {
        const result = await this.memoryModel.deleteOne({ _id: memoryId });
        if (result) {
          await this.commentModel.deleteOne({ memoryId: memoryId }).exec();
          await this.likeModel.deleteOne({ memoryId: memoryId });
        }
        return {
          message: 'Memory is deleted Successfully',
          code: 200,
        };
      } else {
        return {
          message: 'there is no Memory against this User',
          code: 200,
        };
      }
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }
}
