import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExlistService } from './exlist.service';
import { CreateExlistDto } from './dto/create-exlist.dto';
import { UpdateExlistDto } from './dto/update-exlist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { exlist } from './entities/exlist.entity';
import { RolesGuard } from 'src/auth/Guard/roles.guard';
import { Role } from 'src/users/entities/roles.enum';
import { Roles } from 'src/auth/Guard/roles.decorator';

@Controller('exlist')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ADMIN)
export class ExlistController {
  constructor(private readonly exlistService: ExlistService) {}

  @Post('/AddExercise')
  async create(
    @Body() createExerciseDto: CreateExlistDto
  ): Promise<exlist> {
    return this.exlistService.create(createExerciseDto);
  }

  @Get('/GetAll')
  async findAll(): Promise<exlist[]> {
    return this.exlistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<exlist> {
    return this.exlistService.findOne(id);
  }

  @Patch('/UpdateExercise/:id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExlistDto
  ): Promise<exlist> {
    return this.exlistService.update(id, updateExerciseDto);
  }

  @Delete('/DeleteExercise/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.exlistService.remove(id);
  }
}
