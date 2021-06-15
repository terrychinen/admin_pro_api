import { IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateHospitalDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmpty()
    image: string;

    @IsNotEmpty()
    userID: string;
}