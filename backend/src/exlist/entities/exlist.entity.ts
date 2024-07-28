import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity("predefined_exercises ")
export class exlist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  muscle: string;

}
