import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exercise } from './entities/exercice.entity';
import { ExerciseService } from './exercices.service';

@Controller('exercices')
@UseGuards(JwtAuthGuard)
export class ExercicesController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('/AddExercise/:workoutId')
  async create(
    @Param('workoutId') workoutId: string,
    @Body() createExerciseDto: CreateExerciceDto
  ): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto, workoutId);
  }


  @Get('/GetAll')
  async findAll(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Exercise> {
    return this.exerciseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciceDto
  ): Promise<Exercise> {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.exerciseService.remove(id);
  }
}
