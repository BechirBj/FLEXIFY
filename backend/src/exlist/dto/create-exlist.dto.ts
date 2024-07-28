import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateExlistDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    muscle: string;
}
