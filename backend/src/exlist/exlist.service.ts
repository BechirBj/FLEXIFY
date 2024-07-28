import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExlistDto } from './dto/create-exlist.dto';
import { UpdateExlistDto } from './dto/update-exlist.dto';
import { exlist } from './entities/exlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExlistService {
  constructor(
    @InjectRepository(exlist)
    private exerciseListRepository: Repository<exlist>,
  ) {}
  async create(createExerciseDto:CreateExlistDto): Promise<exlist> {
    const newExercise = this.exerciseListRepository.create({
      ...createExerciseDto,
    });
    return this.exerciseListRepository.save(newExercise);
  }

  async findAll(): Promise<exlist[]> {
    return this.exerciseListRepository.find();
  }

  async findOne(id: string): Promise<exlist> {
    const exercise = await this.exerciseListRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExlistDto): Promise<exlist> {
    const exercise = await this.exerciseListRepository.preload({
      id,
      ...updateExerciseDto,
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return this.exerciseListRepository.save(exercise);
  }

  async remove(id: string): Promise<void> {
    const exercise = await this.findOne(id);
    await this.exerciseListRepository.remove(exercise);
  }
}
