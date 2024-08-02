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
import { Roles } from 'src/auth/Guard/roles.decorator';
import { Role } from 'src/users/entities/roles.enum';
import { GetUser } from 'src/Decorator/getUser.decorator';

@UseGuards(JwtAuthGuard)
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
  @Roles(Role.ADMIN, Role.USER)
  findByOwnerId(@GetUser('roles') role:string, @GetUser('userId')id:string,
    ) {
      if(role==Role.ADMIN){
        return this.workoutService.findAll();
      }
      else {
        return this.workoutService.findByOwnerId(id);
      }
  }
  @Get('/GetAllDashboard')
  async findAll(
    @GetUser('userId') userId: string,    
  ): Promise<Workout[]> {
    return this.workoutService.findByOwnerId(userId);
  }



  @Get('/GetWorkout/:id')
  async findOne(@Param('id') id: string): Promise<Workout> {
    return this.workoutService.findOne(id);
  }

  @UseGuards(IsOwnerGuard)
  @Patch('/UpdateWorkout/:id')
  update(
    @Param('id') id: string,
    @Body() updateInterfaceDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(id, updateInterfaceDto);
  }
  @UseGuards(IsOwnerGuard)
  @Delete('/RemoveWorkout/:id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }


}
