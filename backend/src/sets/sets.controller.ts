import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { SetService } from './sets.service';
import { Sets } from './entities/set.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sets> {
    return this.setService.findOne(id);
  }

  @Patch('/UpdateSet/:id')
  async update(
    @Param('id') id: string,
    @Body() updateSetDto: UpdateSetDto,
  ): Promise<Sets> {
    return this.setService.update(id, updateSetDto);
  }

  @Delete('/RemoveSet/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.setService.remove(id);
  }
}
