import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Workout } from './workout/entities/workout.entity';
import { Exercise } from './exercices/entities/exercice.entity';
import { WorkoutsModule } from './workout/workout.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SetsModule } from './sets/sets.module';
import { Sets } from './sets/entities/set.entity';
import { ExerciseModule } from './exercices/exercices.module';
import { PassportModule } from '@nestjs/passport';
import { ExlistModule } from './exlist/exlist.module';
import { exlist } from './exlist/entities/exlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'FLEXIFY',
      entities: [User, Workout, Exercise, Sets, exlist],
      synchronize: true,
    }),
    AuthModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    WorkoutsModule,
    PassportModule,
    UsersModule,
    ExerciseModule,
    SetsModule,
    ExlistModule,
  ],
})
export class AppModule {}
