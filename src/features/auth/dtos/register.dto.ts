import { IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    password: string;

    @IsEmpty()
    image: string;

    @IsEmpty()
    role: string;

    @IsEmpty()
    google: string;
}