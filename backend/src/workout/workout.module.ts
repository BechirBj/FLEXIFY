import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Workout } from './entities/workout.entity';
import { User } from '../users/entities/user.entity';
import { Exercise } from 'src/exercices/entities/exercice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, User,Exercise])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
  exports: [WorkoutService], 
})
export class WorkoutsModule {}
