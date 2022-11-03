import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikeDocument = Like & Document;
@Schema()
export class Like {
  @Prop({required:true})
  userId: string;
  @Prop({required:true})
  memoryId: string;
  @Prop()
  flag: boolean;

}

export const LikeSchema = SchemaFactory.createForClass(Like);
