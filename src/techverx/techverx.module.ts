import { Module } from '@nestjs/common';
import { TechverxService } from './techverx.service';
import { TechverxController } from './techverx.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TechverxSchema } from 'src/schema/techverx.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Techverx', schema: TechverxSchema }]),
  ],
  controllers: [TechverxController],
  providers: [TechverxService],
  exports: [TechverxService],
})
export class TechverxModule {}