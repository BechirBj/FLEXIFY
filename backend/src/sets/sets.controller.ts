import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Patch, NotFoundException } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { SetService } from './sets.service';
import { Sets } from './entities/set.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/Decorator/getUser.decorator';
@UseGuards(JwtAuthGuard)

@Controller('sets')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post('/AddSets/:exerciseId')
  async create(
    @Param('exerciseId') exerciseId: string,
    @Body() createSetDto: CreateSetDto,
  ): Promise<Sets> {
    return this.setService.create(createSetDto, exerciseId);
  }

  @Get('/GetAll')
  async findAll(@Query('exerciseId') exerciseId?: string): Promise<Sets[]> {
    return this.setService.findAll(exerciseId);
  }

  @Get('/GetByExerciseId/:exerciseId')
  async findByExerciseId(
    @Param('exerciseId') exerciseId: string,
  ): Promise<Sets[]> {
    const sets = await this.setService.findByExerciseId(exerciseId);
    if (!sets || sets.length === 0) {
      throw new NotFoundException(`No sets found for exercise ID ${exerciseId}`);
    }
    return sets;
  }

  @Get('/GetBySetId/:setId')
  async findBySetId(@Param('setId') setId: string): Promise<Sets> {
    const set = await this.setService.findBySetId(setId);
    if (!set) {
      throw new NotFoundException(`Set with ID ${setId} not found`);
    }
    return set;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sets> {
    return this.setService.findOne(id);
  }


  @Put('/UpdateSet/:id')
  async updateSet(
    @Param('id') id: string,
    @Body() updateSetDto: UpdateSetDto,
  ): Promise<Sets> {
    try {
      return await this.setService.updateSet(id, updateSetDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update set');
    }
  }

  @Delete('/RemoveSet/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.setService.remove(id);
  }
}
