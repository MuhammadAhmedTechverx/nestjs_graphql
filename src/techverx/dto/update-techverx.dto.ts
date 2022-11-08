import { PartialType } from '@nestjs/mapped-types';
import { CreateTechverxDto } from './create-techverx.dto';

export class UpdateTechverxDto extends PartialType(CreateTechverxDto) {
  rollNo: number;
}
