import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TechverxDocument = Techverx & Document;
@Schema()
export class Techverx {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  rollNo: number;
}

export const TechverxSchema = SchemaFactory.createForClass(Techverx);
