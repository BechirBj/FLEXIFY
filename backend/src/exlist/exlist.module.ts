import { Module } from '@nestjs/common';
import { ExlistService } from './exlist.service';
import { ExlistController } from './exlist.controller';
import { exlist } from './entities/exlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([exlist])],
  controllers: [ExlistController],
  providers: [ExlistService],
  exports:[ExlistService],
})
export class ExlistModule {}
