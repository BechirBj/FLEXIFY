import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { Sets } from './entities/set.entity';
import { ExerciseService } from 'src/exercices/exercices.service';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(Sets)
    private setRepository: Repository<Sets>,
    private exerciseService: ExerciseService,
  ) {}

  async create(createSetDto: CreateSetDto, exerciseId: string): Promise<Sets> {
    const exercise = await this.exerciseService.findOne(exerciseId);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${exerciseId} not found`);
    }
    const newSet = this.setRepository.create({
      ...createSetDto,
      exercice: exercise,
    });
    return this.setRepository.save(newSet);
  }
  async updateSet(id: string, updateSetDto: UpdateSetDto): Promise<Sets> {
    const set = await this.setRepository.findOne({ where: { id } });

    if (!set) {
      throw new NotFoundException('Set not found');
    }

    Object.assign(set, updateSetDto);
    return this.setRepository.save(set);
  }

  async findAll(exerciseId?: string): Promise<Sets[]> {
    if (exerciseId) {
      return this.setRepository.find({
        where: { exercice: { id: exerciseId } },
        relations: ['exercice'],
      });
    }
    return this.setRepository.find({ relations: ['exercice'] });
  }

  async findOne(id: string): Promise<Sets> {
    const set = await this.setRepository.findOne({
      where: { id },
      relations: ['exercice'],
    });
    if (!set) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }
    return set;
  }

  async update(id: string, updateSetDto: UpdateSetDto): Promise<Sets> {
    const set = await this.setRepository.preload({
      id,
      ...updateSetDto,
    });
    if (!set) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }
    return this.setRepository.save(set);
  }

  async remove(id: string): Promise<void> {
    const set = await this.findOne(id);
    await this.setRepository.remove(set);
  }
}
