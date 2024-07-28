import { IsArray, IsNotEmpty, IsString, Length } from "class-validator";
import { CreateSetDto } from "src/sets/dto/create-set.dto";

export class CreateExerciceDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    muscle: string;

}
