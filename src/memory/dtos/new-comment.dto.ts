import { Exclude } from 'class-transformer';
import { IsEmail } from '@nestjs/class-validator';
export class newCommentDTO {
  userId: string;
  memoryId: string;
  comment: [string];
}
