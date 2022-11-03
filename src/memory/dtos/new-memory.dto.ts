import { Exclude } from 'class-transformer';
import { IsEmail } from '@nestjs/class-validator';
export class newMemoryDTO {
  title: string;
  description: string;
  images: [string];
  tags:[string]
  sharefrom:string
}
