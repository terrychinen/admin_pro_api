import { IsEmpty, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmpty()
    image: string;

    @IsUUID()
    @IsNotEmpty()
    hospitalID: string;
}