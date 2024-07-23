import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateSetDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly serie: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly kg: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly reps: number;

}
