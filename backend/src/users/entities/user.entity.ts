import { Workout } from "src/workout/entities/workout.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.enum";
import { IsEnum } from "class-validator";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;
  
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  roles: Role;

  @OneToMany(() => Workout, (workout) => workout.owner)
  workouts: Workout[];
}