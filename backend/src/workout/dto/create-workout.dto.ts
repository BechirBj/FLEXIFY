import { IsArray, IsNotEmpty, IsString, Length } from "class-validator";
import { CreateExerciceDto } from "src/exercices/dto/create-exercice.dto";

export class CreateWorkoutDto {

    @IsString()
    @IsNotEmpty()
    @Length(4, 30)
    readonly name: string;
    
    @IsArray()
    exercises: CreateExerciceDto[];
}
