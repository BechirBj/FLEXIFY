import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercice.entity';
import { WorkoutsModule } from 'src/workout/workout.module';
import { ExercicesController } from './exercices.controller';
import { ExerciseService } from './exercices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), WorkoutsModule],
  providers: [ExerciseService],
  controllers: [ExercicesController],
  exports:[ExerciseService]
})
export class ExerciseModule {}
