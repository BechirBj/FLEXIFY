import { Exercise } from "src/exercices/entities/exercice.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("workouts")
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.workouts, { eager: true })
  owner: User;

  @OneToMany(() => Exercise, (exercise) => exercise.workout, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
  exercises: Exercise[];
}
