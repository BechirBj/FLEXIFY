import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsOwnerGuard } from 'src/auth/Guard/owner.guard';

@UseGuards(JwtAuthGuard,IsOwnerGuard)
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('/CreateWorkout')
  async create(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @Req() req: any,
  ): Promise<Workout> {
    const userId = req.user.userId;
    return this.workoutService.create(createWorkoutDto, userId);
  }

  @Get('/GetAll')
  async findAll(): Promise<Workout[]> {
    return this.workoutService.findAll();
  }

  @Get('/GetWorkout/:id')
  async findOne(@Param('id') id: string): Promise<Workout> {
    return this.workoutService.findOne(id);
  }

  @Patch('/UpdateWorkout/:id')
  update(
    @Param('id') id: string,
    @Body() updateInterfaceDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(id, updateInterfaceDto);
  }

  @Delete('/RemoveWorkout/:id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }
}
