import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercice.entity';
import { WorkoutService } from 'src/workout/workout.service';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private workoutService: WorkoutService,
  ) {}

  async create(createExerciseDto: CreateExerciceDto, workoutId: string): Promise<Exercise> {
    const workout = await this.workoutService.findOne(workoutId);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }
    const newExercise = this.exerciseRepository.create({
      ...createExerciseDto,
      workout,
    });
    return this.exerciseRepository.save(newExercise);
  }

  async findAll(workoutId: string): Promise<Exercise[]> {
    try {
      return await this.exerciseRepository.find({
        where: { workout: { id: workoutId } }, 
      });
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw new Error('Database query failed');
    }
  }

 async findOne(id: string): Promise<Exercise> {
  const exercise = await this.exerciseRepository.findOne({ where: { id } });
  if (!exercise) {
    throw new NotFoundException(`Exercise with ID ${id} not found`);
  }
  return exercise;
}
  async update(id: string, updateExerciseDto: UpdateExerciceDto): Promise<Exercise> {
    const exercise = await this.exerciseRepository.preload({
      id,
      ...updateExerciseDto,
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return this.exerciseRepository.save(exercise);
  }

  async remove(id: string): Promise<void> {
    const exercise = await this.findOne(id);
    await this.exerciseRepository.remove(exercise);
  }
}
