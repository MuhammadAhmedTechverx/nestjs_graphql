import { Exclude } from 'class-transformer';
import { IsEmail } from '@nestjs/class-validator';
export class newLikeDTO {
  memoryId: string;
  flag: boolean
}
