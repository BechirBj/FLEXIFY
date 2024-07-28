import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ){}
  async create(createWorkoutDto: CreateWorkoutDto, user: User): Promise<Workout> {
    const newWorkout = this.workoutRepository.create({
      ...createWorkoutDto,
      id: uuid(), 
      owner: user, 
    });
    
    return await this.workoutRepository.save(newWorkout);
  }

  async findAll(): Promise<Workout[]> {
    return await this.workoutRepository.find({ relations: ['owner', 'exercises'] });
  }

  async findOne(id: string): Promise<Workout> {
    const interfacee = await this.workoutRepository.findOne({
      where: { id },
    });
    if (!interfacee) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    return interfacee;
  }

  async update(
    id: string,
    updateInterMiamiDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    const interfacee = await this.workoutRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!interfacee) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    const updatedWorkout = this.workoutRepository.merge(
      interfacee,
      updateInterMiamiDto,
    );
    return await this.workoutRepository.save(updatedWorkout);
  }

  async remove(id: string): Promise<string> {
    const result: DeleteResult = await this.workoutRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    return 'Deleted successfully';
  }
}
