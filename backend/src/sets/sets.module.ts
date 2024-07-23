import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetService } from './sets.service';
import { SetController } from './sets.controller';
import { Sets } from './entities/set.entity';
import { ExerciseModule } from 'src/exercices/exercices.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sets]), ExerciseModule],
  controllers: [SetController],
  providers: [SetService],
})
export class SetsModule {}
