import { Exercise } from "src/exercices/entities/exercice.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("sets")
export class Sets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  serie: number;

  @Column()
  kg: number;

  @Column()
  reps: number;

 @ManyToOne(() => Exercise, (exercise) => exercise.sets, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
  exercice: Exercise;
}
