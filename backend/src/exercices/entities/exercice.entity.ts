import { Sets } from "src/sets/entities/set.entity";
import { Workout } from "src/workout/entities/workout.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  muscle: string;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { eager: true, onDelete: 'CASCADE' })
  workout: Workout;

  @OneToMany(() => Sets, (set) => set.exercice, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
  sets: Sets[];
}
