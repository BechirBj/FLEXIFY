import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
    Inject,
  } from '@nestjs/common';
import { WorkoutService } from 'src/workout/workout.service';
  
  @Injectable()
  export class IsOwnerGuard implements CanActivate {
    constructor(
      @Inject(WorkoutService)
      private readonly WorkoutService: WorkoutService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const WorkoutId = request.params.id;
      const Workout = await this.WorkoutService.findOne(WorkoutId);
  
      
      if (user.roles === 'admin') {
        return true;
      }
  
      if (!Workout) {
        throw new NotFoundException(`Workout with ID ${WorkoutId} not found`);
      }
  
      if (Workout.owner.id !== user.userId) {
        throw new NotFoundException(
          'You are not authorized to perform this action on this workout',
        );
      }
  
      return true;
    }
  }
  