import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, isString, Length, Max, Min } from "class-validator";
import { Role } from "../entities/roles.enum";

export class CreateUserDto {

    @IsString()
    @Length(3, 20)
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)  
    readonly password: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(18)
    @Max(60)
    readonly age: number;

    @IsEnum(Role, { each: true })
    readonly roles: Role;
    
}
