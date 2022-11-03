import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemoryDocument = Memory & Document;
@Schema({ versionKey: false })
export class Memory {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  images: [string];
  @Prop()
  tags:[string]
  @Prop()
  userId: string;
  @Prop()
  sharefrom: string;

}

export const MemorySchema = SchemaFactory.createForClass(Memory);
